# coding=utf-8

from flask import Flask, jsonify, request

from src.entities.entity import Session, engine, Base
from src.entities.exam import Exam, ExamSchema

# creating the Flask application
app = Flask(__name__)

# generate database schema
Base.metadata.create_all(engine)


@app.route('/exams')
def get_exams():
    # fetching from the database
    session = Session()
    exam_objects = session.query(Exam).all()

    # transforming into JSON-serializable objects
    schema = ExamSchema(many=True)
    exams = schema.dump(exam_objects)

    # serializing as JSON
    session.close()
    return jsonify(exams.data)


@app.route('/exams', methods=['POST'])
def add_exam():
    # mount exam object
    posted_exam = ExamSchema(only=('title', 'description')) \
        .load(request.get_json())

    exam = Exam(**posted_exam.data, created_by="HTTP post request")

    # persist exam
    session = Session()
    session.add(exam)
    session.commit()

    # return created exam
    new_exam = ExamSchema().dump(exam).data
    session.close()
    return jsonify(new_exam), 201

#
# # show existing exams
# print('### Exams:')
# for exam in exams:
#     print(f'({exam.id}) {exam.title} - {exam.description}')

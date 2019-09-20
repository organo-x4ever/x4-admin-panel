# coding=utf-8

from flask_cors import CORS
from flask import Flask, jsonify, request
from src.entities.entity import Session, engine, Base
from src.entities.exam import Exam, ExamSchema

from src.auth import AuthError,requires_auth

# creating the Flask application
app = Flask(__name__)
# print('App Name:', __name__)
CORS(app)

# generate database schema
Base.metadata.create_all(engine)


@app.route('/', methods=['GET'])
def hello_world():
    return 'Private API'


@app.route('/mfume')
def fun_print():
    return 'My Flask App'


@app.route('/get')
def get_print():
    return "My Flask App (get)"


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
    return jsonify(exams)


@app.route('/exams', methods=['POST'])
@requires_auth
def add_exam():
    # mount exam object
    posted_exam = ExamSchema(only=('title', 'description')) \
        .load(request.get_json())
    #
    exam = Exam(**posted_exam, created_by="HTTP post request")
    #
    # persist exam
    session = Session()
    session.add(exam)
    session.commit()
    #
    # return created exam
    new_exam = ExamSchema().dump(exam)
    session.close()
    return jsonify(new_exam), 201
    # return "add_exam()"


@app.errorhandler(AuthError)
def handle_auth_error(ex):
    response = jsonify(ex.error)
    response.status_code = ex.status_code
    return response


if __name__ == '__main__':
    app.run()

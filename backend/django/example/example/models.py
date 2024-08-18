class Question:
    def __init__(self, id, question, answer, options):
        self.id = id
        self.question = question
        self.answer = answer
        self.options = options

    def get_hidden(self):
        return {
            'id': self.id,
            'question_text': self.question,
            'options': self.options
        }

    def is_correct(self, answer):
        return self.answer == answer

    @staticmethod
    def from_json(data):
        return [Question(item['id'], item['question'], item['answers'], item['options']) for item in data]
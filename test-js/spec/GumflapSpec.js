var messageData = [{
  "username": "wfarr",
  "body": "hello world!"
}];

var chatData = [{
  messages: [
    {
      "username": "wfarr",
      "body": "hello world!"
    },
    {
      "username": "bender",
      "body": "bite my shiny metal ass"
    }
  ]
}];

describe("Message", function () {

    beforeEach(function () {
        this.message = new Message(messageData[0]);
    });

    it("creates from data", function () {
        expect(this.message.get('username')).toEqual("wfarr");
    });
});

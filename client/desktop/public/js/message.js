function pmMessage(title, body, clazz) {
    this.title = title
    this.body = body
    this.clazz = clazz || null

    this.msg = null
    this.msgMask = null

    this.init()
}

pmMessage.prototype = {

    constructor: pmMessage,

    show: function() {
        this.msg.addClass('visible')
        if(this.clazz) this.msg.addClass(this.clazz)
        this.msgMask.addClass('visible')
    },

    
    init: function() {
        const msg = $('.message')
        const msgMask = $('.message-mask')

        if(this.title) {
            const jtitle = $(document.createElement('h3')).addClass('message-title').text(this.title)
            msg.append(jtitle)
        }

        const jbody = $(document.createElement('p')).addClass('message-body').text(this.body)
        msg.append(jbody)

        this.msg = msg;
        this.msgMask = msgMask
    }
}
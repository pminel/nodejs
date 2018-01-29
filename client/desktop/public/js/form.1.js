let pmForm = function(htmlFormElement) {
    this.htmlFormElement = htmlFormElement

    this.fields = []
    this.buttons = []
    this.form = null
    this.wrapper = null

    this.init()
}

pmForm.prototype.init = function () {
    const that = this
    const pmform = $(this.htmlFormElement)

    const form = that.initForm(pmform)

    let field
    const fieldArray = pmform.find('pm-form-input, pm-form-select, pm-form-textarea')
    fieldArray.each(function(idx, pmfield) {
        field = that.initField(pmfield)
        form.append(field)
        that.fields.push(field)
    })

    let button
    const buttonArray = pmform.find('pm-form-button')
    if(buttonArray && buttonArray.length > 0) {
        var rowButtons = $(document.createElement('div')).addClass('form-row-button')
        buttonArray.each(function(idx, pmbutton) {
            button = that.initButton(pmbutton)
            rowButtons.append(button)
            that.buttons.push(button)
        })
        form.append(rowButtons)
    }

    const wrapper = $(document.createElement('div')).addClass('form-wrapper')
    wrapper.append(form)

    this.form = form
    this.wrapper = wrapper

    pmform.replaceWith(wrapper)
}

pmForm.prototype.initForm = function(pmform) {
    const action = pmform.attr('action')
    const form = $(document.createElement('form')).attr('method', 'post').attr('action', action)
    return form
}

pmForm.prototype.initField = function(htmlField) {
    const f = $(htmlField)
    const tagName = f.prop('tagName')
    const labelField = f.attr('label')
    const nameField = f.attr('name')
    const typeField = f.attr('type')
    const valueField = f.attr('value')
    const requiredField = f.attr('required')

    const label = $(document.createElement('label')).text(labelField)

    let field
    if(tagName.toUpperCase() === 'PM-FORM-INPUT') {
        field = $(document.createElement('input')).attr('placeholder', labelField).attr('type', typeField).attr('name', nameField).attr('required', requiredField).val(valueField)
    }
    else if(tagName.toUpperCase() === 'PM-FORM-TEXTAREA') {
        field = $(document.createElement('textarea')).attr('placeholder', labelField).attr('name', nameField).attr('required', requiredField).val(valueField)
    }
    else if(tagName.toUpperCase() === 'PM-FORM-SELECT') {
        field = $(document.createElement('select')).attr('placeholder', labelField).attr('name', nameField).attr('required', requiredField)
        
        const optionArray = f.children('pm-form-option')
        let option
        optionArray.each(function(idx, htmlOption) {
            const opt = $(htmlOption)
            const valueOption = opt.attr('value')
            const selectedOption = opt.attr('select')
            const labelOption = opt.attr('label')

            option = $(document.createElement('option')).attr('value', valueOption).html(labelOption)
            if(selectedOption === 'true') option.attr('selected', 'selected')

            field.append(option)
        })
    }

    if(requiredField === 'required') {
        const that = this
        field.on('change blur', function() {
            const val = field.val()
            if(!val) that.setFieldError(field)
            else that.unsetFieldError(field)
        })
    }

    const row = $(document.createElement('div')).addClass('form-row')
    row.append(label).append(field)

    return row
}

pmForm.prototype.initButton = function(htmlButton) {
    const btn = $(htmlButton)
    const classButton = btn.attr('class')
    const labelButton = btn.attr('label')
    const typeButton = btn.attr('type')

    const button = $(document.createElement('button')).addClass(classButton).attr('type', 'button').text(labelButton)

    /* if(typeButton === 'submit') {
        const that = this
        button.on('click', this.sendForm)
    } */

    return button
}

pmForm.prototype.sendForm = function(btn) {

    const isValid = this.isValid(pmForm)
}

pmForm.prototype.isValid = function(pmForm) {
    const fields = pmForm.fields
    console.log(fields)
}

pmForm.prototype.setFieldError = function(field) {
    if(!field.hasClass('error')) {
        field.addClass('error')
        const label = field.prev('label')
        const spanErrorMessage = $(document.createElement('span')).addClass('error-message').text('Campo obbligatorio')
        label.append(spanErrorMessage)
    }
}
pmForm.prototype.unsetFieldError = function(field) {
    if(field.hasClass('error')) {
        field.removeClass('error')
        field.prev('label').find('span').remove()
    }
}





$(document).ready(() => {
    const pmFormArray = $('pm-form')
    pmFormArray.each((idx, htmlEl) => {
        new pmForm(htmlEl)
    })
})



/* function isValidForm(form) {
    const fieldArray = $(form).find('input, select')
    fieldArray.each(isValidField)
}


function isValidField(fieldIndex, field) {
    const f = $(field)
    const required = f.attr('required')
    
    if(required === 'required') {
        f.on('change blur', () => {
            const val = $(this).val()
            if(!val) setFieldError($(this))
            else unsetFieldError($(this))
        })
    }
}


function setFieldError(f) {
    f.addClass('error')
    const label = f.prev('label')
    const spanErrorMessage = $(document.createElement('span')).addClass('error-message').text('Campo obbligatorio')
    label.append(spanErrorMessage)
}


function unsetFieldError(f) {
    f.removeClass('error')
    f.prev('label').find('span').remove()
}




function sendForm(btn) {
    const button = $(btn)
    const form = button.parents('form')

    const isValidForm = isValidForm(form)
    console.log('-- isValidForm = ' + isValidForm)
}




$(document).ready(() => {
    const formArray = $('form')
    formArray.each(initForm)
}) */
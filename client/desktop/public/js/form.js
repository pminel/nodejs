function pmForm(htmlForm) {
    this.htmlForm = htmlForm
    this.form = null

    this.mk()
    this.init()
}

pmForm.prototype = {

    constructor: pmForm,

    send: function() {
        const scope = this
        const form = $(this.form)

        let isValid = true
        const fields = form.find('input, textarea, select')
        fields.each(function(index, raw) {
            const isValidField = scope.isValidField($(this))
            if(!isValidField) isValid = false
        })

        if(!isValid) {
            alert('Impossibile procedere. Dati non validi')
            return
        }
        else form.submit()
    },    


    init: function() {
        const scope = this
        const form = this.form

        const reqfields = form.find('input[required=required], textarea[required=required], select[required=required]')
        reqfields.each(function(index, raw) {
            const reqfield = $(raw)
            reqfield.on('blur', function() {
                scope.isValidField($(this))
            })
        })
    },

    isValidField: function(field) {
        field.removeClass('error')
        field.prev('label').find('span').remove()

        let isValid = true
        let value
        
        const tagname = field.prop('tagName').toUpperCase()
        if(tagname == 'INPUT' || tagname == 'TEXTAREA') value = field.val()
        else if(tagname == 'SELECT') value = field.find(':selected').val()

        if(!value) {
            field.addClass('error')
            const label = field.prev('label')
            const spanError = $(document.createElement('span')).addClass('error-message').text('Campo obbligatorio')
            label.append(spanError)
            return false
        }
        return true
    },

    mk: function() {
        const scope = this
        const jform = $(this.htmlForm)

        // make form
        const action = jform.attr('action')
        const form = this.mkForm(action)

        // make fields
        let field
        const rawfields = jform.find('pm-form-input, pm-form-select, pm-form-textarea')
        rawfields.each(function(idx, rawfield) {
            field = scope.mkField(rawfield)
            form.append(field)
        })

        // make buttons
        let button
        const rawbuttons = jform.find('pm-form-button')
        if(rawbuttons && rawbuttons.length > 0) {
            const rowbutton = this.mkRowButton()
            rawbuttons.each(function(idx, rawbutton) {
                button = scope.mkButton(rawbutton, scope)

                const type = $(rawbutton).attr('type')
                if(type == 'submit') {
                    button.on('click', function() {
                        scope.send()
                    })
                }

                rowbutton.append(button)
            })
            form.append(rowbutton)
        }

        // make wrapper
        const wrapper = this.mkWrapper()
        wrapper.append(form)

        // store form
        this.form = form

        // replace form
        jform.replaceWith(wrapper)
    },

    mkWrapper: function() {
        const wrapper = $(document.createElement('div')).addClass('form-wrapper')
        return wrapper
    },

    mkForm: function(action) {
        const form = $(document.createElement('form')).attr('method', 'post').attr('action', action)
        return form
    },

    mkField: function(rawfield) {
        const field = $(rawfield)
        const tagname = field.prop('tagName').toUpperCase()
        const label = field.attr('label')
        const name = field.attr('name')
        const type = field.attr('type')
        const value = field.attr('value')
        const required = field.attr('required')

        if(type == 'hidden') {
            const hiddenfield = this.mkInputField(label, type, name, value, required)
            return hiddenfield
        }

        // label
        const jlabel = this.mkLabel(label)

        // field
        let jfield
        if(tagname == 'PM-FORM-INPUT') jfield = this.mkInputField(label, type, name, value, required)
        else if(tagname == 'PM-FORM-TEXTAREA') jfield = this.mkTextareaField(label, name, value, required)
        else if(tagname == 'PM-FORM-SELECT') {
            jfield = this.mkSelectField(label, name, value, required)

            const optionPlaceholder = $(document.createElement('option')).html('-- ' + label + ' --')
            jfield.append(optionPlaceholder)

            let option
            const rawoptions = field.children('pm-form-option')
            const scope = this
            rawoptions.each(function(idx, htmlOption) {
                const opt = $(htmlOption)
                const olabel = opt.attr('label')
                const ovalue = opt.attr('value')
                const oselected = opt.attr('select')

                option = scope.mkSelectOption(olabel, ovalue, oselected)
                jfield.append(option)
            })
        }

        // form row
        const row = $(document.createElement('div')).addClass('form-row')
        row.append(jlabel).append(jfield)

        return row
    },

    mkInputField: function(label, type, name, value, required) {
        const input = $(document.createElement('input'))
        input.attr('placeholder', label)
        input.attr('type', type)
        input.attr('name', name)
        input.attr('required', required)
        input.val(value)
        return input
    },

    mkTextareaField: function(label, name, value, required) {
        const textarea = $(document.createElement('textarea'))
        textarea.attr('placeholder', label)
        textarea.attr('name', name)
        textarea.attr('required', required)
        textarea.val(value)
        return textarea
    },

    mkSelectField: function(label, name, value, required) {
        const select = $(document.createElement('select'))
        select.attr('name', name)
        select.attr('required', required)
        return select
    },

    mkSelectOption: function(label, value, selected) {
        const option = $(document.createElement('option'))
        option.attr('value', value)
        option.html(label)
        if(selected === 'true') option.attr('selected', 'selected')
        return option
    },

    mkLabel: function(label) {
        const jlabel = $(document.createElement('label')).text(label)
        return jlabel
    },

    mkRowButton: function() {
        const row = $(document.createElement('div')).addClass('form-row-button')
        return row
    },

    mkButton: function(rawbutton, scope) {
        const jrawbutton = $(rawbutton)
        const label = jrawbutton.attr('label')
        const clazz = jrawbutton.attr('class')
        const button = $(document.createElement('button')).addClass(clazz).attr('type', 'button').text(label)
        return button
    }
}


$(document).ready(() => {
    const pmFormArray = $('pm-form')
    pmFormArray.each((idx, htmlEl) => {
        new pmForm(htmlEl)
    })
})



/* let pmForm = function(htmlFormElement) {
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

    // form
    const form = that.initForm(pmform)

    // fields
    let field
    const fieldArray = pmform.find('pm-form-input, pm-form-select, pm-form-textarea')
    fieldArray.each(function(idx, pmfield) {
        field = that.initField(pmfield)
        form.append(field)
        that.fields.push(field)
    })

    // buttons
    let button
    const buttonArray = pmform.find('pm-form-button')
    if(buttonArray && buttonArray.length > 0) {
        var rowButtons = $(document.createElement('div')).addClass('form-row-button')
        buttonArray.each(function(idx, pmbutton) {
            button = that.initButton(pmbutton)
            rowButtons.append(button)
            that.buttons.push(button)

            const typeButton = $(pmbutton).attr('type')
            if(typeButton === 'submit') button.click(function() {
                that.sendForm(that)
            })
        })
        form.append(rowButtons)
    }

    // wrapper
    const wrapper = $(document.createElement('div')).addClass('form-wrapper')
    wrapper.append(form)

    this.form = form
    this.wrapper = wrapper

    // replace form
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
        field = this.initInput(labelField, typeField, nameField, requiredField, valueField)
    }
    else if(tagName.toUpperCase() === 'PM-FORM-TEXTAREA') {
        field = this.initTextarea(labelField, nameField, requiredField, valueField)
    }
    else if(tagName.toUpperCase() === 'PM-FORM-SELECT') {
        field = this.initSelect(labelField, nameField, requiredField)
        
        const optionArray = f.children('pm-form-option')
        let option
        const that = this
        optionArray.each(function(idx, htmlOption) {
            const opt = $(htmlOption)
            const valueOption = opt.attr('value')
            const selectedOption = opt.attr('select')
            const labelOption = opt.attr('label')

            option = that.initSelectOption(labelOption, selectedOption, valueOption)
            field.append(option)
        })
    }

    if(requiredField === 'required') field.on('change blur', function() {
        const that = this
        that.checkIsValidField(field)
    })

    const row = $(document.createElement('div')).addClass('form-row')
    row.append(label).append(field)

    return row
}

pmForm.prototype.initInput = function(labelField, typeField, nameField, requiredField, valueField) {
    const input = $(document.createElement('input'))
    input.attr('placeholder', labelField)
    input.attr('type', typeField)
    input.attr('name', nameField)
    input.attr('required', requiredField)
    input.val(valueField)
    return input
}

pmForm.prototype.initTextarea = function(labelField, nameField, requiredField, valueField) {
    const textarea = $(document.createElement('textarea'))
    textarea.attr('placeholder', labelField)
    textarea.attr('name', nameField)
    textarea.attr('required', requiredField)
    textarea.val(valueField)
    return textarea
}

pmForm.prototype.initSelect = function(labelField, nameField, requiredField) {
    const select = $(document.createElement('select'))
    select.attr('placeholder', labelField)
    select.attr('name', nameField)
    select.attr('required', requiredField)
    return select
}

pmForm.prototype.initSelectOption = function(labelOption, selectedOption, valueOption) {
    const option = $(document.createElement('option'))
    option.attr('value', valueOption)
    option.html(labelOption)
    if(selectedOption === 'true') option.attr('selected', 'selected')
    return option
}

pmForm.prototype.initButton = function(htmlButton) {
    const btn = $(htmlButton)
    const classButton = btn.attr('class')
    const labelButton = btn.attr('label')

    const button = $(document.createElement('button')).addClass(classButton).attr('type', 'button').text(labelButton)

    return button
}

pmForm.prototype.checkIsValidField = function(field) {
    //const field = $(evt.target)
    const val = field.val()
    
    if(!val) {
        if(!field.hasClass('error')) {
            field.addClass('error')
            const label = field.prev('label')
            const spanErrorMessage = $(document.createElement('span')).addClass('error-message').text('Campo obbligatorio')
            label.append(spanErrorMessage)
            return false
        }
    }
    else {
        if(field.hasClass('error')) {
            field.removeClass('error')
            field.prev('label').find('span').remove()
        }
    }

    return true
}


pmForm.prototype.sendForm = function(that) {
    const isValid = that.isValid()
    console.log('isValid = ' + isValid)
}

pmForm.prototype.isValid = function() {
    const that = this
    const fields = this.fields

    let isValid = true
    let isValidField = true
    $.each(fields, function(idx, field) {
        isValidField = that.checkIsValidField(field)
        console.log(isValidField)
        if(!isValidField) isValid = false
    })

    return isValid
}





$(document).ready(() => {
    const pmFormArray = $('pm-form')
    pmFormArray.each((idx, htmlEl) => {
        new pmForm(htmlEl)
    })
})
 */
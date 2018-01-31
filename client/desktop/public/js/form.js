function pmForm(htmlForm) {
    this.htmlForm = htmlForm
    this.formAction = null
    this.form = null

    this.mk()
    this.init()
}

pmForm.prototype = {

    constructor: pmForm,

    send: function() {
        const scope = this
        const form = $(this.form)
        const action = this.formAction

        const data = {}
        let isValid = true, field, name, value
        const fields = form.find('input, textarea, select')
        fields.each(function(index, raw) {
            field = $(this)
            name = field.attr('name')
            if(name) {
                value = field.val()
                data[name] = value
            }
            const isValidField = scope.isValidField(field)
            if(!isValidField) isValid = false
        })

        if(!isValid) {
            alert('Impossibile procedere. Dati non validi')
            return
        }
        else {
            $.post(action, data, (response) => {
                form.trigger('submit', response)
            }, 'json')
        }
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
        else if(tagname == 'SELECT') value = field.find(':selected').attr('value')

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

        // get action form
        this.formAction = jform.attr('action')

        // make form
        const form = this.mkForm()

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

    mkForm: function() {
        const form = $(document.createElement('form'))
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
        const readonly = field.attr('readonly')

        if(type == 'hidden') {
            const hiddenfield = this.mkInputField(label, type, name, value, required, readonly)
            return hiddenfield
        }

        // label
        const jlabel = this.mkLabel(label)

        // field
        let jfield
        if(tagname == 'PM-FORM-INPUT') jfield = this.mkInputField(label, type, name, value, required, readonly)
        else if(tagname == 'PM-FORM-TEXTAREA') jfield = this.mkTextareaField(label, name, value, required, readonly)
        else if(tagname == 'PM-FORM-SELECT') {
            jfield = this.mkSelectField(label, name, value, required, readonly)

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

    mkInputField: function(label, type, name, value, required, readonly) {
        const input = $(document.createElement('input'))
        input.attr('placeholder', label)
        input.attr('type', type)
        input.attr('name', name)
        input.attr('required', required)
        if(readonly) input.attr('readonly', 'readonly')
        input.val(value)
        return input
    },

    mkTextareaField: function(label, name, value, required, readonly) {
        const textarea = $(document.createElement('textarea'))
        textarea.attr('placeholder', label)
        textarea.attr('name', name)
        textarea.attr('required', required)
        if(readonly) textarea.attr('readonly', 'readonly')
        textarea.val(value)
        return textarea
    },

    mkSelectField: function(label, name, value, required, readonly) {
        const select = $(document.createElement('select'))
        select.attr('name', name)
        select.attr('required', required)
        if(readonly) select.attr('readonly', 'readonly')
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
    },


    getForm: function() {
        return $(this.form)
    }
}
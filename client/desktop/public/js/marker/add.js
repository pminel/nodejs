$(document).ready(() => {

    pmForm = new pmForm($('pm-form'))
    pmForm.getForm().on('submit', (e, response) => {
        const success = response.success
        const message = response.message

        let msg
        if(!success) {
            msg = new pmMessage('Inserisci marcatura', message, 'red')
            msg.show()
        }
        else {
            msg = new pmMessage('Inserisci marcatura', message, 'green')
            msg.show()

            const redirectTo = response.redirectTo
            if(redirectTo) {
                setTimeout(() => {
                    window.location.href = redirectTo
                }, 2000)
            }
        }
    })

    const data = pmUtil.getDate()
    $("[name=data]").val(data)

    const ora = pmUtil.getTime()
    $("[name=ora]").val(ora)
})
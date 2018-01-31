$(document).ready(() => {

    pmForm = new pmForm($('pm-form'))
    pmForm.getForm().on('submit', (e, response) => {
        const success = response.success
        const message = response.message

        let msg
        if(!success) {
            msg = new pmMessage('Aggiorna dati utente', message, 'red')
            msg.show()
        }
        else {
            msg = new pmMessage('Aggiorna dati utente', message, 'green')
            msg.show()

            const redirectTo = response.redirectTo
            if(redirectTo) {
                setTimeout(() => {
                    window.location.href = redirectTo
                }, 2000)
            }
        }
    })
})
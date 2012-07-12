define({
    socket: null,
    error: function(error) {
        if (error.severity == 'FATAL') {
            alert('A fatal error has occurred');
        }
        console.error(error);

        return error;
    }
});

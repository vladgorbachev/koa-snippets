const _store = {
    currentDay: null,
    numberRequests: 1
}

const isLimitedMethod = method =>  ['GET', 'PUT', 'POST', 'DELETE'].includes(method)

const rateLimitMiddleware = async (ctx, next) => {
    const { url, method } = ctx.request
    
    if (isLimitedMethod(method)) { 

        const dayOfMonth = new Date().getDate()

        if (dayOfMonth !== _store.currentDay) {
            _store.currentDay = dayOfMonth;
            _store.counter = 0;
          }

        if (_store.numberRequests > 10) {
            console.log({
                limit: 10, message: 'Limit requests per day'
            })
            ctx.body = 'Limited'
            return
        }

        
        const loggingPayload =  { url, method, count: _store.numberRequests, start: _store.currentDay}

    
        console.log(loggingPayload)
        _store.numberRequests++
        await next();
    } else {
        await next()
    }
}

module.exports = {
    rateLimitMiddleware
}
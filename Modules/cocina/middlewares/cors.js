import cors from 'cors'
export const corsMiddlewares = () => {

    return cors({
        origin: (origin, callback) => {
          const ACCEPTED_ORIGINS = [
            'http://localhost:8080',
            'http://localhost:1234',
          ]
      
          if (ACCEPTED_ORIGINS.includes(origin)) {
            return callback(null, true)
          }
      
          if (!origin) {
            return callback(null, true)
          }
      
          return callback(new Error('Not allowed by CORS'))
        }
      })
}
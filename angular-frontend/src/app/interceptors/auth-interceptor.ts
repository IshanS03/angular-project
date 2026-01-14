import { HttpHeaders, HttpInterceptorFn } from '@angular/common/http';

//this is a functional interceptor
//it intercepts all outgoing requestsa and processes them before they leave
//we're going to use it to tack on basic auth information
export const authInterceptor: HttpInterceptorFn = (req, next) => {
  
  let headers: HttpHeaders = new HttpHeaders();

  //encoding our login information

  let authString: string = btoa('admin:password123');
  console.log(authString);

  let newReq = req.clone({ headers: req.headers.set('Authorization', 'Basic ' + authString) 

  });

  return next(newReq);
};

export interface ErrorResponse  {
  message?: string;                     
  code?: string | number;                 
  errors?: Record<string, string[] | string>; 
  details?: string;                      
};
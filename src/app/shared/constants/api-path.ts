import { environment } from '../../../environments/environment';

// export class ApiPath {
// }

export const ApiPath = {
    CREATE_TASK: `${environment.apiBaseUrl}/newtasks`,
    ALL_TASKS: `${environment.apiBaseUrl}/tasks`
  };

import { Route } from '@angular/router';
import { TasklistComponent } from './components/tasklist/tasklist.component';

export const appRoutes: Route[] = [
    {path: "app-task", component: TasklistComponent},
];

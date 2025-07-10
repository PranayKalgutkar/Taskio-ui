export interface UserTask {
  taskId: string;
  title: string;
  description?: string;
  dueDate?: Date;
  status?: string;
  assignedUser?: string;
  createdBy: string;
  createdOn: Date;
}

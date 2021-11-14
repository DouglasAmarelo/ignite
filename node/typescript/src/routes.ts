import { Request, Response } from 'express';

import CreateCourseService from './CreateCourseService';

export const createCourse = (req: Request, res: Response) => {
  CreateCourseService.execute({
    name: 'NodeJS',
    duration: 10,
    educator: 'Douglas "Amarelo" Lopes',
  });

  CreateCourseService.execute({
    name: 'NodeJS 2',
    educator: 'Douglas "Amarelo" Lopes 2',
  });
};

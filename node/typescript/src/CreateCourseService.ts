interface Course {
  name: string;
  duration?: number;
  educator: string;
}

class CreateCourseService {
  execute({ name, duration, educator }: Course) {
    console.log(
      `Creating course ${name}${
        duration ? ` with duration of ${duration}` : ''
      }, by ${educator}`
    );
  }
}

export default new CreateCourseService();

// Don't use const here, to prevent TypeScript from in-lining!
export enum EmailTarget {
    AllUsers = 0,
    AllGroups = 0,
    AllTeachers = 0,
    AllStudents = 0,
    AllCourseManagers = 0,
    AllObservers = 0,
    SpecificUsers = 1,
    SpecificGroups = 1,
    SpecificObservers = 1
}

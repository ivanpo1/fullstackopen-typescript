import type {CoursePart} from "../types.ts";

const assertNever = (value: never): never => {
    throw new Error(
        `Unhandled discriminated union member: ${JSON.stringify(value)}`
    );
};

const Part = ({course}: { course: CoursePart }) => {
    switch (course.kind) {
        case "basic":
            return (
                <div>
                    <h3>{course.name}</h3>
                    <p>Exercises: {course.exerciseCount}</p>
                    <p>{course.description}</p>
                </div>
            )
        case "group":
            return (
                <div>
                    <h3>{course.name}</h3>
                    <p>Exercises: {course.exerciseCount}</p>
                    <p>Project exercises: {course.groupProjectCount}</p>
                </div>
            )
        case "background":
            return (
                <div>
                    <h3>{course.name}</h3>
                    <p>Exercises: {course.exerciseCount}</p>
                    <p>{course.description}</p>
                    <p>{course.backgroundMaterial}</p>
                </div>
            )
        case "special":
            return (
                <div>
                    <h3>{course.name}</h3>
                    <p>Exercises: {course.exerciseCount}</p>
                    <p>{course.description}</p>
                    <p>Requirements: {course.requirements.map((req, index )=> <span key={index}>{req} </span>)}</p>

                </div>
            )
        default:
            return assertNever(course)
    }
}

export default Part
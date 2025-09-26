import Part from "./Part.tsx";
import type { CoursePart } from "../types.ts";

const Content = ({ courseParts }: { courseParts: CoursePart[] }) => {
    return (
        <div>
            {courseParts.map((course, index) => (
                <Part key={index} course={course}/>
            ))}
        </div>
    )
}

export default Content;
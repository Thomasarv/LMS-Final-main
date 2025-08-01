// import { Button } from '@/components/ui/button'
// import { ArrowLeft } from 'lucide-react'
// import React from 'react'
// import { Link, useParams } from 'react-router-dom'
// import LectureTab from './LectureTab'

// const EditLecture = () => {
//     const params = useParams()
//     const courseId = params.courseId
//     return (
//         <div className='p-4 md:p-10 h-screen'>
//             <div className='flex items-center justify-between mb-5'>
//                 <div className='flex items-center gap-2'>
//                     <Link to={`/admin/course/${courseId}/lecture`}>
//                         <Button size="icon" variant="outline" className="rounded-full"><ArrowLeft size={16} /></Button>
//                     </Link>
//                     <h1 className='font-bold text-xl'>Update Your Lecture </h1>
//                 </div>
//             </div>
//             <LectureTab/>
//         </div>
//     )
// }

// export default EditLecture



import { Button } from '@/components/ui/button'
import { ArrowLeft } from 'lucide-react'
import React from 'react'
import { Link, useParams } from 'react-router-dom'
import LectureTab from './LectureTab'

const EditLecture = () => {
    const params = useParams()
    const courseId = params.courseId
    return (
        <div className='p-4 md:p-10 h-screen'>
            <div className='flex flex-col md:flex-row items-start md:items-center justify-between mb-5 gap-3 md:gap-0'>
                <div className='flex items-center gap-2'>
                    <Link to={`/admin/course/${courseId}/lecture`}>
                        <Button size="icon" variant="outline" className="rounded-full">
                            <ArrowLeft size={16} />
                        </Button>
                    </Link>
                    <h1 className='font-bold text-xl'>Update Your Lecture</h1>
                </div>
            </div>
            <LectureTab />
        </div>
    )
}

export default EditLecture

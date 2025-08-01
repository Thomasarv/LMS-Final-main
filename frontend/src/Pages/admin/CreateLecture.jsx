import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { setLecture } from '@/redux/lectureSlice'
import axios from 'axios'
import { Edit, Loader2 } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { toast } from 'sonner'

const CreateLecture = () => {
      const backendURL = import.meta.env.VITE_BACKEND_URL;
  const params = useParams()
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [lectureTitle, setLectureTitle] = useState('')
  const [loading, setLoading] = useState(false)
  const { lecture } = useSelector((store) => store.lecture)

  // Fetch lectures on mount or when courseId changes
  useEffect(() => {
    const getLectures = async () => {
      try {
        const res = await axios.get(
         `${backendURL}/api/course/${params.courseId}/lecture`,
          { withCredentials: true }
        )
        if (res.data.success) {
          dispatch(setLecture(res.data.lectures))
        }
      } catch (error) {
        console.log(error)
      }
    }
    if (params.courseId) {
      getLectures()
    }
  }, [dispatch, params.courseId])

  const createLectureHandler = async () => {
    if (!lectureTitle.trim()) {
      toast.error('Lecture title cannot be empty')
      return
    }
    try {
      setLoading(true)
      const res = await axios.post(
        `${backendURL}/api/course/${params.courseId}/lecture`,
        { lectureTitle },
        {
          headers: {
            'Content-Type': 'application/json',
          },
          withCredentials: true,
        }
      )
      if (res.data.success) {
        toast.success(res.data.message)
        setLectureTitle('') // reset input

        // Refetch updated lectures list
        const fetchRes = await axios.get(
          `${backendURL}/api/course/${params.courseId}/lecture`,
          { withCredentials: true }
        )
        if (fetchRes.data.success) {
          dispatch(setLecture(fetchRes.data.lectures))
        }
      } else {
        toast.error('Something went wrong')
      }
    } catch (error) {
      console.log(error)
      toast.error('Failed to create lecture')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="p-4 md:p-10 md:pr-20 h-screen">
      <h1 className="text-2xl font-bold mb-2">
        Lets Add <span className="text-blue-600">Lectures</span>
      </h1>
      <p className='text-gray-700'> Start by adding detailed lectures to build a comprehensive course that engages your students.</p>
      <div className="mt-10 space-y-5">
        <div>
          <Label>Title</Label>
          <Input
            type="text"
            placeholder="Your Lecture Name"
            className="bg-white"
            value={lectureTitle}
            onChange={(e) => setLectureTitle(e.target.value)}
          />
        </div>
        <div className="flex gap-2">
          <Button
            onClick={() => navigate(`/admin/course/${params.courseId}`)}
            variant="outline"
          >
            Back to Course
          </Button>
          <Button
            disabled={loading}
            onClick={createLectureHandler}
            className="bg-gray-800 hover:bg-gray-800"
          >
            {loading ? (
              <>
                <Loader2 className="mr-1 h-4 w-4 animate-spin" />
                Please wait
              </>
            ) : (
              'Create Lecture'
            )}
          </Button>
        </div>
      </div>

      <div className="mt-10">
        {(Array.isArray(lecture) ? lecture : []).map((lectureItem, index) => {
          return (
            <div
              key={lectureItem._id || index}
              className="flex items-center justify-between bg-[#F7F9FA] px-4 py-2 rounded-md my-2"
            >
              <h1 className="font-bold text-gray-800">
                Lecture - {index + 1}: {lectureItem.lectureTitle}
              </h1>
              <Edit
                onClick={() => navigate(`${lectureItem._id}`)}
                size={20}
                className="cursor-pointer text-gray-600 hover:text-blue-600"
              />
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default CreateLecture

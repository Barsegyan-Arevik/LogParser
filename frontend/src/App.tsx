import * as React from 'react';
import { BrowserRouter, Route, Routes, Link, useParams } from 'react-router-dom';
import CourseSideBar from './components/SideBar/CourseSideBar';
import CommonSectionPage from './pages/CommonSectionPage';
import PagesSectionPage from './pages/PagesSectionPage/PagesSectionPage';
import VideoSectionPage from './pages/VideoSectionPage';
import ForumSectionPage from './pages/ForumSectionPage';
import ProblemSectionPage from './pages/ProblemSectionPage';
import TextbookSectionPage from './pages/TextbookSectionPage';
import StudentsPage from './pages/StudentsPage/StudentsPage';
import { MdOutlineAnalytics, MdOutlineForum } from 'react-icons/md';
import { FiMousePointer } from 'react-icons/fi';
import { IoBookOutline, IoExtensionPuzzleOutline, IoVideocamOutline } from 'react-icons/io5';
import { RiTeamLine } from 'react-icons/ri';

const courses = [
    {
        id: 'DATANTECH2035',
        name: 'Курс 1',
    },
    {
        id: 'DATSTBASE',
        name: 'Курс 2',
    },
];

const WelcomePage = () => {
    return (
        <div>
            <h1>Доступные курсы</h1>
            <ul>
                {courses.map(course => (
                    <li key={course.id}>
                        <Link to={`/courses/${course.id}/common`}>{course.name}</Link>
                    </li>
                ))}
            </ul>
        </div>
    );
};

const menuItems = [
    {
        path: '/',
        name: 'Домой',
        icon: <FiMousePointer />,
    },
    ...courses.map(course => ({
        path: `/courses/${course.id}/common`,
        name: 'Общая информация',
        icon: <MdOutlineAnalytics />
    })),
    ...courses.map(course => ({
        path: `/courses/${course.id}/pages`,
        name: 'Популярность страниц',
        icon: <FiMousePointer/>
    })),
    ...courses.map(course => ({
        path: `/courses/${course.id}/textbook`,
        name: 'Работа с учебником',
        icon: <IoBookOutline/>
    })),
    ...courses.map(course => ({
        path: `/courses/${course.id}/video`,
        name: 'Просмотры видео',
        icon: <IoVideocamOutline/>
    })),
    ...courses.map(course => ({
        path: `/courses/${course.id}/problems`,
        name: 'Решение задач',
        icon: <IoExtensionPuzzleOutline/>
    })),
    ...courses.map(course => ({
        path: `/courses/${course.id}/forum`,
        name: 'Активность на форуме',
        icon: <MdOutlineForum/>
    })),
    ...courses.map(course => ({
        path: `/courses/${course.id}/students`,
        name: 'Студенты',
        icon: <RiTeamLine/>
    })),
];
//     },
//     {
//         path: `/courses/${COURSE_ID}/students`,
//         name: 'Студенты',
//         icon: <RiTeamLine/>,
//     },

const App = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<WelcomePage />} />
                <Route
                    path="/courses/:courseId/*"
                    element={<CourseRoutes />}
                />
            </Routes>
        </BrowserRouter>
    );
};

const CourseRoutes = () => {
    const { courseId } = useParams();

    return (
        <CourseSideBar menuItems={menuItems} currentCourseId={courseId}>
            <Routes>
                <Route path="common" element={<CommonSectionPage />} />
                <Route path="pages" element={<PagesSectionPage />} />
                <Route path="video" element={<VideoSectionPage />} />
                <Route path="forum" element={<ForumSectionPage />} />
                <Route path="problems" element={<ProblemSectionPage />} />
                <Route path="textbook" element={<TextbookSectionPage />} />
                <Route path="students" element={<StudentsPage />} />
            </Routes>
        </CourseSideBar>
    );
};

export default App;

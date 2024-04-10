import * as React from 'react';
import {useEffect, useState} from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import {Box} from '@mui/material';
import {PiStudentBold} from 'react-icons/pi';
import {getBlueColorScale, getColorByCompletionStatus} from '../../../utils/utils';

export type RowData = {
    id: number;
    username: string;
    completionStatus: string;
    daysOnline: string;
    timeOnCourse: string;
    videoWatching: string;
    textbookScrolling: string;
    promblemsSolving: string;
    forumActivity: string;
}

export type StudentsCommonTableProps = {
    data: string;
    boxTitle: string;
    username: string,
    completionStatus: string,
    daysOnline: string,
    timeOnCourse: string,
    videoWatching: string,
    textbookScrolling: string,
    promblemsSolving: string,
    forumActivity: string,
}

function getColumnRange(columnName, rows) {
    const columnArray = rows.map(row => row[columnName]);

    const minVal = Math.min(...columnArray);
    const maxVal = Math.max(...columnArray);
    const range = maxVal - minVal;

    return {range, minVal};
}


export default function StudentsCommonTable(props: StudentsCommonTableProps) {
    const rows = props.data
        .trim()
        .split('\n')
        .slice(1) // Пропускаем строку с заголовками
        .map((row, index) => {
            const [username, completionStatus, daysOnline, timeOnCourse, videoWatching, textbookScrolling, problemsSolving, forumActivity] = row.split(',');
            return {
                // id: index + 1,
                username,
                completionStatus,
                daysOnline: parseInt(daysOnline, 10),
                timeOnCourse: parseInt(timeOnCourse, 10),
                videoWatching: parseInt(videoWatching, 10),
                textbookScrolling: parseInt(textbookScrolling, 10),
                problemsSolving: parseInt(problemsSolving, 10),
                forumActivity: parseInt(forumActivity, 10)
            };
        });
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [searchTerm, _] = useState('');

    useEffect(() => {
        setPage(0); // Переход на первую страницу при изменении поискового запроса
    }, [searchTerm]);

    const handleChangePage = (event: unknown, newPage: number) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    const daysOnlineRange = getColumnRange('daysOnline', rows);
    const timeOnCourseRange = getColumnRange('timeOnCourse', rows);
    const videoWatching = getColumnRange('videoWatching', rows);
    const textbookScrolling = getColumnRange('textbookScrolling', rows);
    const problemsSolving = getColumnRange('problemsSolving', rows);
    const forumActivity = getColumnRange('forumActivity', rows);

    const cellStyle = {fontSize: '16px', color: '#405479'}

    return (
        <Paper sx={{overflow: 'hidden', padding: '10px', width: '88%'}}>
            <Box
                sx={{
                    fontSize: 16,
                    p: 1,
                    color: '#405479',
                    alignItems: 'center',
                }}
            >

            </Box>
            <TableContainer>
                <Table stickyHeader size="small" aria-label="sticky table"
                       sx={{borderSpacing: '8px 0', borderCollapse: 'separate', color: '#405479'}}>
                    <TableHead style={{color: '#405479'}}>
                        <TableRow>
                            <TableCell style={cellStyle}>{props.username}</TableCell>
                            <TableCell style={cellStyle}>{props.daysOnline}</TableCell>
                            <TableCell style={cellStyle}>{props.timeOnCourse}</TableCell>
                            <TableCell style={cellStyle}>{props.videoWatching}</TableCell>
                            <TableCell style={cellStyle}
                                       sx={{marginRight: '8px'}}>{props.textbookScrolling}</TableCell>
                            <TableCell style={cellStyle}>{props.promblemsSolving}</TableCell>
                            <TableCell style={cellStyle}>{props.forumActivity}</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody sx={{'&:last-child td, &:last-child th': {border: 0}}}>
                        {rows
                            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                            .map((row, index) => (
                                <TableRow hover role="checkbox" tabIndex={-1} key={row.id}>
                                    <TableCell
                                        style={{fontSize: '16px', color: '#405479'}}
                                    >
                                        <PiStudentBold size={24}
                                                       color={getColorByCompletionStatus(row.completionStatus)}/>
                                        {row.username}
                                    </TableCell>

                                    <TableCell
                                        style={{
                                            fontSize: '16px', color: '#405479',
                                            backgroundColor: row.daysOnline ? getBlueColorScale(daysOnlineRange.range, daysOnlineRange.minVal, row.daysOnline) : 'white'
                                        }}
                                    >
                                        {row.daysOnline}
                                    </TableCell>

                                    <TableCell
                                        style={{
                                            fontSize: '16px',
                                            color: '#405479',
                                            backgroundColor: row.timeOnCourse ? getBlueColorScale(timeOnCourseRange.range, timeOnCourseRange.minVal, row.timeOnCourse) : 'white'
                                        }}
                                    >
                                        {row.timeOnCourse}
                                    </TableCell>

                                    <TableCell
                                        style={{
                                            fontSize: '16px', color: '#405479',
                                            backgroundColor: row.videoWatching ? getBlueColorScale(videoWatching.range, videoWatching.minVal, row.videoWatching) : 'white',
                                            padding: '8px',
                                        }}
                                    >
                                        {row.videoWatching}
                                    </TableCell>

                                    <TableCell
                                        style={{
                                            fontSize: '16px', color: '#405479',
                                            backgroundColor: row.textbookScrolling ? getBlueColorScale(textbookScrolling.range, textbookScrolling.minVal, row.textbookScrolling) : 'white',
                                            padding: '8px'
                                        }}
                                    >
                                        {row.textbookScrolling}
                                    </TableCell>
                                    <TableCell
                                        style={{
                                            fontSize: '16px', color: '#405479',
                                            backgroundColor: row.problemsSolving ? getBlueColorScale(problemsSolving.range, problemsSolving.minVal, row.problemsSolving) : 'white',
                                            padding: '8px'
                                        }}
                                    >
                                        {row.problemsSolving}
                                    </TableCell>
                                    <TableCell
                                        style={{
                                            fontSize: '16px', color: '#405479',
                                            backgroundColor: row.forumActivity ? getBlueColorScale(forumActivity.range, forumActivity.minVal, row.forumActivity) : 'white',
                                            padding: '8px'
                                        }}
                                    >
                                        {row.forumActivity}
                                    </TableCell>
                                </TableRow>
                            ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <TablePagination
                rowsPerPageOptions={[10, 50, 100]}
                component="div"
                count={rows.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />
        </Paper>
    );
}
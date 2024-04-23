import * as React from 'react'
import ValueBox from '../Charts/Box/ValueBox'
import DatesLineChart from '../Charts/LineChart/DatesLineChart'
import SectionActivityChart from '../Charts/SectionActivityChart/SectionActivityChart'
import ChartWrapper from '../Charts/ChartWrapper/ChartWrapper'
import { getStudentEnding } from '../../utils/utils'
import { CommonReport } from '../../models/report'
import { Grid } from '@mui/material'

export type CommonSectionProps = {
    report: CommonReport;
}

export default function CommonSection(props: CommonSectionProps) {
    const numberOfStudents = props.report.students_count
    const numberOfActiveStudents = props.report.active_students_count
    const sectionActivityChart = props.report.section_activity_chart.items
    const weeklyActivityChart = props.report.weekly_activity_chart.items.map(
        item => ({
            date: new Date(item.date),
            count: item.count
        }))

    return (
        <Grid container spacing={2} paddingTop={1}>
            <Grid container spacing={2} justifyContent={'center'} direction={'row'}>
                <Grid item xs={12} md={3.5}>
                    <Grid container spacing={2}>
                        <Grid item xs={12} md={12}>
                            <ValueBox
                                value={numberOfStudents}
                                valueAdditionalText={getStudentEnding(numberOfStudents)}
                                label="Всего на курсе"
                            />
                        </Grid>
                        <Grid item xs={12} md={12}>
                            <ValueBox
                                value={numberOfActiveStudents}
                                valueAdditionalText={getStudentEnding(numberOfActiveStudents)}
                                label="Из них активных"
                            />
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item xs={12} md={6.5}>
                    <SectionActivityChart items={sectionActivityChart} numberOfStudents={numberOfStudents} />
                </Grid>
                <Grid item xs={12} md={10}>
                    <ChartWrapper
                        chartTitle={'Активность на курсе, по неделям'}
                        chart={
                            <DatesLineChart
                                points={weeklyActivityChart}
                                boxSize={{
                                    width: '50rem',
                                    height: '19rem'
                                }}
                                lineChartSize={{
                                    width: '50rem',
                                    height: '14rem'
                                }}
                                sliderSize={{
                                    width: '47rem',
                                    height: '19rem'
                                }}
                            />
                        }
                    />
                </Grid>
            </Grid>
        </Grid>
    )
}
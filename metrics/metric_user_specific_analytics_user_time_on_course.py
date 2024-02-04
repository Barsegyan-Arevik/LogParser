import datetime
import ntpath
from tabulate import tabulate
import plotly.graph_objects as go
from db_operations import *
from sql_queries_dict import *

def calculate_total_user_time_on_course(connection):
    print('Start query execution at ', datetime.datetime.now())

    total_users_time_on_course_query = sql_query_total_user_time_on_course

    connection.set_isolation_level(ISOLATION_LEVEL_AUTOCOMMIT)
    cursor = connection.cursor()
    cursor.execute(total_users_time_on_course_query)
    total_users_time_on_course = cursor.fetchall()
    cursor.close()
    connection.commit()

    print('End query execution at ', datetime.datetime.now())
    return total_users_time_on_course


def calculate_user_session_activity_per_day_on_course(connection, user_id):
    print('Start query execution at ', datetime.datetime.now())

    user_time_on_course_per_day_query = sql_query_user_time_on_course_per_day

    connection.set_isolation_level(ISOLATION_LEVEL_AUTOCOMMIT)
    cursor = connection.cursor()
    cursor.execute(user_time_on_course_per_day_query, (user_id,))
    user_time_on_course_per_day = cursor.fetchall()
    cursor.close()
    connection.commit()

    print('End query execution at ', datetime.datetime.now())
    return user_time_on_course_per_day


def generate_total_time_distribution_figure(user_time_on_course):
    print("Start figures generation...")

    index = 1
    x_axis = []
    y_axis = []

    for duration in user_time_on_course:
        x_axis.append(index)
        y_axis.append(duration[1].total_seconds() / (60 * 60))
        index += 1

    fig = go.Figure(data=go.Scatter(x=x_axis, y=y_axis))

    fig.update_layout(
        height=500,
        width=2000,
        title_text="User time on course.",
        xaxis=go.layout.XAxis(
            title=go.layout.xaxis.Title(
                text="User order number",
                font=dict(
                    family="Courier New, monospace",
                    size=18,
                    color="#7f7f7f"
                )
            )
        ),
        yaxis=go.layout.YAxis(
            title=go.layout.yaxis.Title(
                text="Time in hours",
                font=dict(
                    family="Courier New, monospace",
                    size=18,
                    color="#7f7f7f"
                )
            )
        ))

    print("Opening browser...")
    fig.show()


def generate_user_time_distribution_per_day_figure(calculate_user_session_activity_per_day_on_course):
    print("Start figures generation...")

    total_time = 0
    user_id = ''
    x_axis = []
    y_axis = []

    for duration in calculate_user_session_activity_per_day_on_course:
        user_id = duration[0]
        x_axis.append(duration[1])
        y_axis.append(duration[2].total_seconds() / (60 * 60))
        total_time += duration[2].total_seconds() / (60 * 60)

    fig = go.Figure(data=go.Scatter(x=x_axis, y=y_axis))

    fig.update_layout(
        height=500,
        width=2000,
        title_text="User with id '" + user_id + "' time on course distributed per day. "
                                                "Total time spent '" + str(total_time) + "' hours.",
        xaxis=go.layout.XAxis(
            title=go.layout.xaxis.Title(
                text="Date",
                font=dict(
                    family="Courier New, monospace",
                    size=18,
                    color="#7f7f7f"
                )
            )
        ),
        yaxis=go.layout.YAxis(
            title=go.layout.yaxis.Title(
                text="Time in hours",
                font=dict(
                    family="Courier New, monospace",
                    size=18,
                    color="#7f7f7f"
                )
            )
        ))

    print("Opening browser...")
    fig.show()


def write_total_time_result_to_file(result_file, result):
    print('Start writing the data to file.')
    with open(result_file,"w") as file:
        file.write(tabulate(result, headers=['user_id', 'time_on_course']))
    print('The analytics result can be found at ', result_file)


def write_user_time_result_to_file(result_file, result, user_id):
    print('Start writing the data to file.')
    path = ntpath.dirname(result_file)
    filename = user_id + '_user_time_on_course.csv'
    result_file = path + "/" + filename
    with open(result_file,"w") as file:
        file.write(tabulate(result, headers=['user_id', 'session_date', 'time_at_session_per_day']))
    print('The analytics result can be found at ', result_file)


def main():
    print('Type user id to analyze his/her activity. If no user id is provided, then total time on '
          'course for every user is calculated.')
    user_id = input("User id: ")

    print('Start calculating user time on course.')

    result_file = "../results/distinct_user_time_on_course.txt"
    connection = psycopg2.connect(user="postgres", password="s1n2e3i4p5", host="127.0.0.1", port="5432",
                                  database="ITMO_2")

    if not user_id:
        total_users_time_on_course = calculate_total_user_time_on_course(connection)
        write_total_time_result_to_file(result_file, total_users_time_on_course)
        generate_total_time_distribution_figure(total_users_time_on_course)
    else:
        user_time_on_course_per_day = calculate_user_session_activity_per_day_on_course(connection, user_id)
        write_user_time_result_to_file(result_file, user_time_on_course_per_day, user_id)
        generate_user_time_distribution_per_day_figure(user_time_on_course_per_day)

    close_db_connection(connection)


if __name__ == '__main__':
    main()
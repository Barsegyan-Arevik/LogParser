import csv

import pandas as pd
import plotly.express as px


result_path = '../../metric_results/'


def save_output_to_file(result_file, result, field_names):
    print('Save result to file')
    with open(result_path + result_file, mode='w', encoding='utf-8') as res_file:
        result_file_writer = csv.writer(res_file, delimiter=',', quotechar='"', quoting=csv.QUOTE_MINIMAL)
        result_file_writer.writerow(field_names)
        for res in result:
            result_file_writer.writerow(res)
    print('Result is in the file ', result_path + result_file)


def find_alias(url, urls_and_names_mapping):
    for url_mapping in urls_and_names_mapping:
        if url_mapping[0] == url + '/':
            return url_mapping[1]
    return None


def generate_bar_figure(result_file, fields, xaxis_title=None, yaxis_title=None):
    df = pd.read_csv(result_path + result_file)
    fig = px.bar(df, x=fields[0], y=fields[1])
    if xaxis_title and yaxis_title:
        fig.update_layout(xaxis_title=xaxis_title, yaxis_title=yaxis_title)
    fig.show()
import * as React from 'react';
import { useState } from 'react';
import './DocumentSection.css'
import Header from '../HeaderSection/Header';
import CustomTableRealData from '../../Charts/TableHeatMapRealData';

export type TableData = {
    boxTitle: string;
    columnName: string;
    columnCount: string;
    labelText: string;
    data: string;
}

export type DocumentSectionProps = {
    tableScrollingData: TableData;
    tableSearchedTermsData: TableData;
    headerText: string;
    // !!!graphData?  
}



export default function DocumentSection(props: DocumentSectionProps) {

    function convertingStringToTableScrolling(str) {
        return str
            .trim()
            .split('\n')
            .slice(1) // Пропустить первую строку (заголовки столбцов)
            .map((row, index) => {
                const [pdfName, scrollingAmount] = row.split(',');
                return { user: pdfName, timeSec: parseInt(scrollingAmount, 10) };
            })
            .sort((a, b) => b.timeSec - a.timeSec) // Сортировка по убыванию
            .map((data, index) => ({ ...data, id: index + 1 })); // Добавление идентификатора
    }

     function convertingStringToTableSearchedTerms(data) {
         return data
             .trim()
             .split('\n')
             .slice(1) // Пропустить первую строку (заголовки столбцов)
             .map((row, index) => {
                 const [pdfName, scrollingAmount] = row.split(',');
                 return { user: scrollingAmount, timeSec: parseInt(pdfName, 10) };
             })
             .sort((a, b) => b.timeSec - a.timeSec) // Сортировка по убыванию
             .map((data, index) => ({ ...data, id: index + 1 })); // Добавление идентификатора
     }

    // Пример использования:
    const initialScrollingData = convertingStringToTableScrolling(props.tableScrollingData.data);
    const initialSearchedTermsData = convertingStringToTableSearchedTerms(props.tableSearchedTermsData.data)


    const [rowsScrolling, setRowsScrolling] = useState(initialScrollingData);
    const [rowsSearchedTerms, setRowsSearchedTerms] = useState(initialSearchedTermsData);


    return (
        <div className={"document_interaction"}>
            <div>
                <Header text={props.headerText} />
            </div>
            <div className='document_interaction_container'>
                <div className='item_doc_1'>
                    <CustomTableRealData
                        rows={rowsScrolling}
                        boxTitle={props.tableScrollingData.boxTitle}
                        columnName={props.tableScrollingData.columnName}
                        columnCount={props.tableScrollingData.columnCount}
                        labelText={props.tableScrollingData.labelText}
                    />
                </div>
                <div className='item_doc_2'>
                    <CustomTableRealData
                        rows={rowsSearchedTerms}
                        boxTitle={props.tableSearchedTermsData.boxTitle}
                        columnName={props.tableSearchedTermsData.columnName}
                        columnCount={props.tableSearchedTermsData.columnCount}
                        labelText={props.tableSearchedTermsData.labelText}
                    />
                    
                </div>
            </div>

            {/*<MinMaxExample/>*/}
            {/* <VerticalBarChart/> */}
        </div>
    );
};

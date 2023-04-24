import { Item } from './item';

export class itemService {
  item: Item[] = [
    {
      date: '03/01/2023',
      type: 'Journal Entry',
      No: '9',
      Member: '0005 John Concepcion',
      DueDate: '03/01/2023',
      Balance: 'P14,000.00',
      Status: 'Overdue',
    },
    {
      date: '03/01/2023',
      type: 'Invoice',
      No: '11',
      Member: '0006 Dale Allen Liwanag',
      DueDate: '03/01/2023',
      Balance: 'P14,000.00',
      Status: 'Overdue',
    },
    {
      date: '03/01/2023',
      type: 'Payment',
      No: '34',
      Member: '0007 Nicer Dizon',
      DueDate: '03/01/2023',
      Balance: 'P14,000.00',
      Status: 'Pending',
    },
    {
      date: '03/01/2023',
      type: 'Journal Entry',
      No: '45',
      Member: '0008 Meg Nicole Serrano',
      DueDate: '03/01/2023',
      Balance: 'P14,000.00',
      Status: 'Overdue',
    },
    {
      date: '03/01/2023',
      type: 'Invoice',
      No: '15',
      Member: '0009 Allen Alipio',
      DueDate: '03/01/2023',
      Balance: 'P14,000.00',
      Status: 'Overdue',
    }
  ];

  term = '';
}

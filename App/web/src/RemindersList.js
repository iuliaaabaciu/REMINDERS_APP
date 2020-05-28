import React from 'react';
import UpdateReminder from './UpdateReminder';

const RemindersList = (props) => {
    const reminder = props.filteredReminders.map((element) =>
        <li key={element.id}>
          <UpdateReminder
            updateReminder={props.updateReminder} 
            updateDateScheduled={props.updateDateScheduled}
            defaultValue={element.text}
            elementId={element.id}
            dateScheduled={element.dateScheduled}
          />
        </li>
    );

    return (
      <ul>
        {reminder}
      </ul>
    );
}

export default RemindersList;
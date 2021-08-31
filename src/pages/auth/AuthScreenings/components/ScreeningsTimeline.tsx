import React, { useEffect, useState } from "react";
import moment from "moment";
import Timeline, { TimelineHeaders, DateHeader } from "react-calendar-timeline";

import "./ScreeningsTimeline.css";
import screenings from "../../../../api/ScreeningsApi";

const ScreeningsTimeline = ({ startDate, endDate }) => {
  const [groups, setGroups] = useState([]);
  const [items, setItems] = useState([]);

  const [isLoadingData, setLoadingData] = useState(true);

  useEffect(() => {
    setLoadingData(true);

    screenings
      .getMovieScreeningTimeline(startDate.toFormat("dd/MM/yyyy"), endDate.toFormat("dd/MM/yyyy"))
      .then((res) => {
        let _groups = [],
          _items = [];

        res.data.rows.forEach((hall) => {
          _groups.push({
            id: hall.hallId,
            title: hall.hallName,
          });

          hall.screenings.map((screening, i) => {
            _items.push({
              id: screening.id,
              group: hall.hallId,
              title: screening.movieTitle,
              start_time: moment(
                screening.date.replace("00:00:00", screening.startTime),
                "yyyy-MM-DDThh:mm:ss"
              ),
              end_time: moment(screening.date.replace("00:00:00", screening.endTime), "yyyy-MM-DDThh:mm:ss"),
            });
          });
        });

        setGroups(_groups);
        setItems(_items);
        setLoadingData(false);
      })
      .catch((err) => {
        console.log(err);
        setLoadingData(false);
      });
  }, []);

  return isLoadingData ? (
    <div>test</div>
  ) : (
    <Timeline
      className="screening__timeline"
      groups={groups}
      items={items}
      defaultTimeStart={items[0].start_time}
      defaultTimeEnd={items[0].end_time}
      timeSteps={{
        second: 1,
        minute: 15,
        hour: 1,
        day: 1,
        month: 1,
        year: 1,
      }}
    >
      <TimelineHeaders>
        <DateHeader unit="primaryHeader" labelFormat={`DD/MM/yyyy`} />
        <DateHeader labelFormat="HH:mm" />
      </TimelineHeaders>
    </Timeline>
  );
};

export default ScreeningsTimeline;

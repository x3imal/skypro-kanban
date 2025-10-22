import { useMemo, useState } from "react";
import {
    Wrap, Title, Block, Nav, Month, NavActions, NavBtn,
    Content, Days, Day, Cells, Cell, Period
} from "./Calendar.styled";
import {
    WEEKDAYS_SHORT, MONTHS_RU, STARTS_ON_MONDAY,
    parseAnyDate, formatRu, toISODate
} from "../../constants/calendar";

function buildMonthGrid(viewYear, viewMonth) {
    const first = new Date(viewYear, viewMonth, 1);
    const firstIdx = first.getDay(); // 0..6 (0 = вс)
    const shift = STARTS_ON_MONDAY ? (firstIdx === 0 ? 6 : firstIdx - 1) : firstIdx;
    const start = new Date(viewYear, viewMonth, 1 - shift);

    const cells = Array.from({ length: 42 }, (_, i) => {
        const d = new Date(start);
        d.setDate(start.getDate() + i);
        return d;
    });
    return cells;
}

export default function Calendar({
                                     value,
                                     onChange,
                                     showHint = false,
                                     title = "Даты",
                                     readOnly = false,
                                 }) {
    const selectedInit = parseAnyDate(value) || null;
    const today = new Date();

    const [viewYear, setViewYear] = useState((selectedInit || today).getFullYear());
    const [viewMonth, setViewMonth] = useState((selectedInit || today).getMonth());
    const [selected, setSelected] = useState(selectedInit);

    const grid = useMemo(() => buildMonthGrid(viewYear, viewMonth), [viewYear, viewMonth]);

    const handlePrev = () => {
        if (readOnly) return;
        const d = new Date(viewYear, viewMonth - 1, 1);
        setViewYear(d.getFullYear());
        setViewMonth(d.getMonth());
    };
    const handleNext = () => {
        if (readOnly) return;
        const d = new Date(viewYear, viewMonth + 1, 1);
        setViewYear(d.getFullYear());
        setViewMonth(d.getMonth());
    };

    const isSameDay = (a, b) =>
        a && b &&
        a.getFullYear() === b.getFullYear() &&
        a.getMonth() === b.getMonth() &&
        a.getDate() === b.getDate();

    const handlePick = (d) => {
        if (readOnly) return;
        setSelected(d);
        onChange?.(d);
    };

    const activeDate = readOnly ? selectedInit : selected;

    return (
        <Wrap $readOnly={readOnly}>
            <Title>{title}</Title>

            <Block>
                <Nav>
                    <Month>{MONTHS_RU[viewMonth]} {viewYear}</Month>
                    {!readOnly && (
                        <NavActions>
                            <NavBtn aria-label="prev" onClick={handlePrev}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="10" height="16" viewBox="0 0 6 11">
                                    <path fill="currentColor" d="M5.72945 1.95273C6.09018 1.62041 6.09018 1.0833 5.72945 0.750969C5.36622 0.416344 4.7754 0.416344 4.41218 0.750969L0.528487 4.32883C-0.176162 4.97799 -0.176162 6.02201 0.528487 6.67117L4.41217 10.249C4.7754 10.5837 5.36622 10.5837 5.72945 10.249C6.09018 9.9167 6.09018 9.37959 5.72945 9.04727L1.87897 5.5L5.72945 1.95273Z"/>
                                </svg>
                            </NavBtn>
                            <NavBtn aria-label="next" onClick={handleNext}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="10" height="16" viewBox="0 0 6 11">
                                    <path fill="currentColor" d="M0.27055 9.04727C-0.0901833 9.37959 -0.0901832 9.9167 0.27055 10.249C0.633779 10.5837 1.2246 10.5837 1.58783 10.249L5.47151 6.67117C6.17616 6.02201 6.17616 4.97799 5.47151 4.32883L1.58782 0.75097C1.2246 0.416344 0.633778 0.416344 0.270549 0.75097C-0.0901831 1.0833 -0.090184 1.62041 0.270549 1.95273L4.12103 5.5L0.27055 9.04727Z"/>
                                </svg>
                            </NavBtn>
                        </NavActions>
                    )}
                </Nav>

                <Content>
                    <Days>{WEEKDAYS_SHORT.map((d) => <Day key={d}>{d}</Day>)}</Days>

                    <Cells>
                        {grid.map((d) => {
                            const inThisMonth = d.getMonth() === viewMonth;
                            const isWeekend = [0, 6].includes(d.getDay());
                            const current = isSameDay(d, today);
                            const active = isSameDay(d, activeDate);

                            return (
                                <Cell
                                    key={toISODate(d)}
                                    onClick={readOnly ? undefined : () => handlePick(d)}
                                    $current={current}
                                    $active={active}
                                    $weekend={isWeekend}
                                    $otherMonth={!inThisMonth}
                                    $disabled={readOnly}
                                    role="gridcell"
                                    aria-disabled={readOnly || undefined}
                                >
                                    {inThisMonth ? d.getDate() : ""}
                                </Cell>
                            );
                        })}
                    </Cells>
                </Content>

                <Period>
                    <p>
                        {showHint ? (
                            <>Выберите срок исполнения <span className="date-control">{activeDate ? formatRu(activeDate) : ""}</span></>
                        ) : (
                            <>Срок исполнения: <span className="date-control">{activeDate ? formatRu(activeDate) : ""}</span></>
                        )}
                    </p>
                </Period>
            </Block>
        </Wrap>
    );
}

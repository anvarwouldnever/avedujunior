import { View, Text } from 'react-native'
import React from 'react'
import Svg, { Line } from 'react-native-svg';

const Lines = React.memo(({ lines, lineStartX, lineStartY, lineEndX, lineEndY, passed }) => {
        const arrowLength = 10; // длина стрелки
    
        const getArrowLines = (x1, y1, x2, y2) => {
            const dx = x2 - x1;
            const dy = y2 - y1;
            const angle = Math.atan2(dy, dx);
    
            const angle1 = angle - Math.PI / 6;
            const angle2 = angle + Math.PI / 6;
    
            const arrow1 = {
                x1: x2,
                y1: y2,
                x2: x2 - arrowLength * Math.cos(angle1),
                y2: y2 - arrowLength * Math.sin(angle1),
            };
    
            const arrow2 = {
                x1: x2,
                y1: y2,
                x2: x2 - arrowLength * Math.cos(angle2),
                y2: y2 - arrowLength * Math.sin(angle2),
            };
    
            return [arrow1, arrow2];
        };
    
        return (
            <Svg
                style={{
                    position: "absolute",
                    width: "100%",
                    height: "100%",
                }}
            >
                {lines.map((line, index) => {
                    const [arrow1, arrow2] = getArrowLines(line.x1, line.y1, line.x2, line.y2);
    
                    return (
                        <React.Fragment key={index}>
                            <Line
                                x1={line.x1}
                                y1={line.y1}
                                x2={line.x2}
                                y2={line.y2}
                                stroke={passed === 1 ? "#30AB02" : "#504297"}
                                strokeWidth={2}
                            />
                            <Line
                                x1={arrow1.x1}
                                y1={arrow1.y1}
                                x2={arrow1.x2}
                                y2={arrow1.y2}
                                stroke={passed === 1 ? "#30AB02" : "#504297"}
                                strokeWidth={2}
                            />
                            <Line
                                x1={arrow2.x1}
                                y1={arrow2.y1}
                                x2={arrow2.x2}
                                y2={arrow2.y2}
                                stroke={passed === 1 ? "#30AB02" : "#504297"}
                                strokeWidth={2}
                            />
                        </React.Fragment>
                    );
                })}
            </Svg>
        );
    });

export default Lines
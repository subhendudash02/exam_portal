// api call later

const list = [
    {   
        test_id: 1,
        test_name: "demo",
        start: "Mon Jun 20 2022 12:30:00",
        end: "Mon Jun 20 2022 14:30:00",
        questions: [
            {   
                ques_id: 1,
                question_name: "Match the following",
                rows: [
                {
                    id: 1,
                    colA: "one",
                    colB: "2"
                },
                {
                    id: 2,
                    colA: "two",
                    colB: "3"
                },
                {
                    id: 3,
                    colA: "three",
                    colB: "1",
                },]
            },
            {
                ques_id: 2,
                question_name: "Match the languages",
                rows: [
                {
                    id: 1,
                    colA: "Python",
                    colB: "Low Level Language"
                },
                {
                    id: 2,
                    colA: "C++",
                    colB: "High Level Language"
                },]
            },
            {
                ques_id: 3,
                question_name: "Match the alphabets",
                rows: [
                {
                    id: 1,
                    colA: "a",
                    colB: "A"
                },
                {
                    id: 2,
                    colA: "b",
                    colB: "B"
                },
                {
                    id: 3,
                    colA: "c",
                    colB: "C"
                },
                {
                    id: 4,
                    colA: "d",
                    colB: "D"
                },]
            }
        ]
    }
];

export default list;
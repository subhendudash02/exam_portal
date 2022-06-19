// api call later

const list = [
    {   
        test_id: 1,
        test_name: "demo",
        start: "Wed Jun 19 2022 20:00:00",
        end: "Wed Jun 19 2022 22:00:00",
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
                question_name: "Match the following",
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
            }
        ]
    }
];

export default list;
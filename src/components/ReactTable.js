import React from "react";
import { Table, DataType } from "ka-table";
import { SortDirection, SortingMode } from "ka-table/enums";
import { Box, HStack, Text } from "@chakra-ui/react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const dataArray = [
  {
    id: 1,
    name: "Mike Wazowski",
    score: 80,
    passed: true,
    faculty: "Economics",
    comment: "Well done!",
  },
  {
    id: 2,
    name: "Billi Bob",
    score: 55,
    passed: true,
    faculty: "Engineering",
    comment: "Almost did it, keep going",
  },
  {
    id: 3,
    name: "Tom Williams",
    score: 45,
    passed: true,
    faculty: "Engineering",
    comment: "You can do it better",
  },
  {
    id: 4,
    name: "Kurt Cobain",
    score: 75,
    passed: true,
    faculty: "Economics",
    comment: "Well done!",
  },
  {
    id: 5,
    name: "Marshall Bruce",
    score: 77,
    passed: true,
    faculty: "Mathematics",
    comment: "Well done!",
  },
  {
    id: 6,
    name: "Sunny Fox",
    score: 33,
    passed: false,
    faculty: "Mathematics",
    comment: "It was just a bad day :)",
  },
];
const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    return (
      <Box
        bg="gray.700"
        color="white"
        p={2}
        borderRadius="md"
        boxShadow="md"
        position="relative"
        zIndex={1000}
        opacity={0.9}
      >
        <Text>{`Score: ${payload[0].value}`}</Text>
      </Box>
    );
  }
  return null;
};
const CustomCell = ({ column, value, rowData }) => {
  if (column.key === "passed") {
    return (
      <Box
        bgColor={value ? "green.500" : "red.500"}
        color="white"
        display="flex"
        alignItems="center"
        justifyContent="center"
        width="100%"
        height="100%"
      >
        <Text>{value ? "Pass" : "Fail"}</Text>
      </Box>
    );
  }

  if (column.key === "score") {
    return (
      <Box color={value < 40 ? "red.500" : "green.500"}>
        <Text fontWeight={"bold"}>{value}</Text>
      </Box>
    );
  }
  if (column.key === "comment") {
    const chartData = [{ name: rowData.name, score: rowData.score }];

    return (
      <HStack>
        <Box width={"200px"}>
          <Text mb={2}>{value}</Text>
        </Box>
        <ResponsiveContainer width="30%" height={40}>
          <BarChart data={chartData}>
            <XAxis dataKey="name" hide />
            <YAxis hide />
            <Tooltip content={<CustomTooltip />} position={{ y: -10 }} />
            <Bar dataKey="score" fill={rowData.score < 40 ? "red" : "green"} />
          </BarChart>
        </ResponsiveContainer>
      </HStack>
    );
  }

  return <Text>{value}</Text>;
};

const SortableTableWithGraphs = () => {
  return (
    <Table
      columns={[
        {
          dataType: DataType.Boolean,
          key: "passed",
          style: { width: 90 },
          title: "Pass/Fail",
        },
        {
          dataType: DataType.String,
          key: "name",
          style: { width: 100 },
          title: "Name",
        },
        {
          dataType: DataType.Number,
          key: "score",
          sortDirection: SortDirection.Ascend,
          style: { width: 120 },
          title: "Score",
        },
        {
          dataType: DataType.String,
          key: "faculty",
          style: { width: 150 },
          title: "Faculty",
        },
        // {
        //   dataType: DataType.String,
        //   key: "comment",
        //   style: { width: 150 },
        //   isSortable: false,
        //   title: "Comment",
        // },
        {
          dataType: DataType.String,
          key: "comment",
          style: { width: 150 },
          isSortable: false,
          title: "Comment / Score Chart",
        },
      ]}
      data={dataArray}
      rowKeyField={"id"}
      sortingMode={SortingMode.Single}
      childComponents={{
        cellText: {
          content: (props) => <CustomCell {...props} />,
        },
        sortIcon: {
          content: ({ column }) => {
            if (column.key === "faculty") {
              return null;
            }
          },
        },
      }}
    />
  );
};

export default SortableTableWithGraphs;

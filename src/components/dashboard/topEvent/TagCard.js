import React from "react";

// import { useConfig } from "../../context";

const TagCard = ({ fontStyle, style, tag }) => {
//   const { getAllEventTags } = useConfig();
//   const tagsMap = getAllEventTags();
  return (
    <div
    //   style={[{ backgroundColor: tagsMap[tag].color }, styles.container, style]}
    >
      <p style={[styles.p, fontStyle]}>{
    //   tagsMap[tag].title
      }</p>
    </div>
  );
};

export default TagCard;

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    borderRadius: 10.5,
    justifyContent: "center",
    height: 12,
    width: 62,
  },
  text: {
    color: "#1E1E1E",
    // fontFamily: fonts[600],
    fontSize: 8,
  },
});

import * as React from "react";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";

import "./news.css";

const PaginationPart = ({ setPage, pagesCount }) => {
  const handleChange = (p) => {
    setPage(p);
  };

  return (
    <Stack spacing={2}>
      <Pagination
        onChange={(e, p) => handleChange(p)}
        className="pagination"
        style={{ display: "flex", justifyContent: "center" }}
        count={pagesCount}
        variant="outlined"
        shape="rounded"
        color="primary"
      />
    </Stack>
  );
};

export default PaginationPart;

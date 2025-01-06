import { Breadcrumbs, Button, Link, Typography } from "@mui/material";
import AddBoxIcon from "@mui/icons-material/AddBox";
import { Link as RouterLink } from "react-router-dom";
import React from "react";
type Breadcrumb = {
  label: string;
  href?: string;
};

interface PageHeaderProps {
  breadcrumbs: Breadcrumb[];
}

const PageHeader: React.FC<PageHeaderProps> = ({
  breadcrumbs,
}) => {
  function toTitleCase(text: string): string {
    return text?.toLowerCase()
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  }
  return (
    <div className="py-3">
      <Breadcrumbs
        sx={{
          fontSize: ".9rem",
        }}
        aria-label="breadcrumb"
      >
        {breadcrumbs.map((breadcrumb, index) =>
          breadcrumb.href ? (
            <Link
              key={index}
              className="font-[400]"
              underline="hover"
              color="black"
              href={breadcrumb.href}
            >
              {breadcrumb.label}
            </Link>
          ) : (
            <Typography
              sx={{
                fontSize: ".9rem",
              }}
              key={index}
              color="text.primary"
              className="  "
            >
              {toTitleCase(breadcrumb.label)}
            </Typography>
          )
        )}
      </Breadcrumbs>

     
    </div>
  );
};

export default PageHeader;

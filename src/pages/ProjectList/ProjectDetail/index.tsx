import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import PageHeader from "../../../components/BreadCrumb";
import {
  Alert,
  FormControl,
  FormLabel,
  Snackbar,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { ViewMode } from "../../../components/ViewMode";
import MyDatePicker from "../../../components/input/Date";
import dayjs from "dayjs";
import LoadingButton from "@mui/lab/LoadingButton";
import { StyledGridInputWrapper, StyledGridInputWrapperRow, StyledPaper, StyledStackInputs } from "./style";
import { Loading } from "../../../components/loader";
import { AlertColor } from "@mui/material";
import { useProjectContext } from "../../../Context/Project";

interface ProjectDto {
  id: number;
  name: string;
  startDate: string;
  endDate: string;
  status: string;
  projectManager: string;
  description: string;
}

interface Errors {
  [key: string]: string | undefined;
}

const ProjectDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [inputData, setInputData] = React.useState<ProjectDto>({
    id: 0,
    name: "",
    startDate: "",
    endDate: "",
    status: "",
    projectManager: "",
    description: "",
  });
  const [errors, setErrors] = React.useState<Errors>({});
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const  navigate=useNavigate()
  const {dispatch}=useProjectContext()

  
  const [snackbarData, setSnackbarData] = useState<{
    open: boolean;
    message: string;
    type: AlertColor;
  }>({
    open: false,
    message: "",
    type: "success",
  });

  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    
    const { name, value } = event.target;
    setInputData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: undefined }));
  };

  const handleDateChange = (name: keyof ProjectDto, date: Date | null) => {
    setInputData((prev) => ({
      ...prev,
      [name]: date ? dayjs(date).format("YYYY-MM-DD") : "",
    }));
    setErrors((prev) => ({ ...prev, [name]: undefined }));
  };

  const validateForm = () => {
    const newErrors: Errors = {};

    if (!inputData.name) {
      newErrors.name = "Project name is required.";
    }

    if (!inputData.startDate) {
      newErrors.startDate = "Start date is required.";
    }

    if (!inputData.endDate) {
      newErrors.endDate = "End date is required.";
    }

    if (inputData.endDate && inputData.startDate && dayjs(inputData.endDate).isBefore(dayjs(inputData.startDate))) {
      newErrors.endDate = "End date cannot be before the start date.";
    }

    if (!inputData.projectManager) {
      newErrors.projectManager = "Project manager is required.";
    }

    if (!inputData.description) {
      newErrors.description = "Description is required.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validateForm() || !id) {
      return; 
    }

    setLoading(true);
    setError(""); 

    const data: Partial<ProjectDto> = {
      description: inputData.description,
      startDate: inputData.startDate,
      endDate: inputData.endDate,
      projectManager: inputData.projectManager,
      name:inputData.name
    };

    try {
      const response = await fetch(`http://localhost:3001/projects/${inputData.id}`, {
        method: "PATCH", // FOR  not  provide  name
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(inputData),
      });

      if (!response.ok) {
        throw new Error("Failed to update project");
      }
      //   we  can  navigate  to  the  table
      setSnackbarData({
        message:"Project updated successfully!",
        open:true,
        type:"success"
      });
      dispatch({type:"UPDATE_PROJECT",payload:{id:id,data:{
        description: inputData.description,
        startDate: inputData.startDate,
        endDate: inputData.endDate,
        projectManager: inputData.projectManager,
        name:inputData.name
      }}})
      navigate("/");

    } catch (error: unknown) {
      setError((error as Error).message);
      setSnackbarData({
        message: (error as Error).message || "Failed to update project with id",
        open:true,
        type:"error"
      });
    
    } finally {
      setLoading(false); 
    }
  };

  useEffect(() => {
    if (id) {
      setLoading(true);
      fetch(`http://localhost:3001/projects/${id}`)
        .then((res) => {
          if (!res.ok) {
            throw new Error('Project not found');
          }
          return res.json();
        })
        .then((data) => {
          setInputData(data);
          setLoading(false);
        })
        .catch((err) => {
          setError(err ||'Error fetching project');
          setLoading(false);
          //  we  can  redirect  for  if  we  need  
          setSnackbarData({
            message:error || "field to load project with  id",
            open:true,
            type:"error"
          });
    

        });
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const  handleCloseSnackbar=()=>{
    setSnackbarData({
      open:false,
      message:"",
      type:"success"
      });
  }
  if (!id) {
    return <Typography color="error">Invalid Project</Typography>;
  }

  if (loading) {
    return <Loading />;
  }

  return (
    <Stack direction="column" sx={{ padding: "16px" }} spacing={3}>
      <PageHeader
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Project Detail" },
        ]}
      />
      <StyledPaper elevation={0}>
        <StyledGridInputWrapperRow>
          <StyledGridInputWrapper>
            <StyledStackInputs gap={3}>
              <ViewMode name="Project id" value={inputData.id || "N/A"} />
              <FormControl fullWidth>
                <Stack direction="row" spacing={2} alignItems="center">
                  <FormLabel sx={{ minWidth: 180, flexShrink: 0 }}>
                  Project Name
                  </FormLabel>
                  <TextField
                    name="name"
                    fullWidth
                    value={inputData.name}
                    onChange={handleInputChange}
                    error={!!errors.name}
                    helperText={errors.name}
                  />
                </Stack>
              </FormControl>
              <FormControl fullWidth>
                <Stack direction="row" spacing={2} alignItems="center">
                  <FormLabel sx={{ minWidth: 180, flexShrink: 0 }}>
                    Description
                  </FormLabel>
                  <TextField
                    name="description"
                    multiline
                    rows={4}
                    fullWidth
                    value={inputData.description || ""}
                    onChange={handleInputChange}
                    error={!!errors.description}
                    helperText={errors.description}
                  />
                </Stack>
              </FormControl>
              {/* Start and End Dates */}
              {["startDate", "endDate"].map((field) => (
                <MyDatePicker
                  key={field}
                  label={field === "startDate" ? "Start Date" : "End Date"}
                  required
                  direction="row"
                  name={field}
                  onChange={(date) => handleDateChange(field as keyof ProjectDto, date)}
                value={
                  inputData[field as keyof ProjectDto]
                    ? new Date(inputData[field as keyof ProjectDto] as string)
                    : null
                }
                error={!!errors[field]}
                  helperText={errors[field]}
                  {...(field === "endDate" && {
                    minDate: inputData.startDate
                      ? dayjs(inputData.startDate).add(1, "day").toDate()
                      : dayjs().toDate(),
                  })}
                />
              ))}

              <FormControl fullWidth>
                <Stack direction="row" spacing={2} alignItems="center">
                  <FormLabel sx={{ minWidth: 180, flexShrink: 0 }}>
                    Project Manager
                  </FormLabel>
                  <TextField
                    name="projectManager"
                    fullWidth
                    value={inputData.projectManager}
                    onChange={handleInputChange}
                    error={!!errors.projectManager}
                    helperText={errors.projectManager}
                  />
                </Stack>
              </FormControl>
            </StyledStackInputs>
          </StyledGridInputWrapper>
        </StyledGridInputWrapperRow>

        <Stack direction="row" spacing={2} alignItems="center">
        <Stack direction="row" spacing={2} alignItems="center"
         sx={{ minWidth: 180, flexShrink: 0 }}
        >
          </Stack>

          <LoadingButton
            loading={loading}
            variant="contained"
            onClick={handleSubmit}
            sx={{ marginTop: "16px" }}
          >
            Update
          </LoadingButton>
        </Stack>
          {!!snackbarData?.open && 
      <Snackbar
        open={snackbarData?.open}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
      >
        <Alert onClose={handleCloseSnackbar} severity={snackbarData.type }>
          {snackbarData?.message}
        </Alert>
      </Snackbar>
}
    
      </StyledPaper>
      
    </Stack>
  );
};

export default ProjectDetail;

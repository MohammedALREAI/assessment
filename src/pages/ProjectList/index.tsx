import { useEffect, useState } from "react";
import { Button, Stack } from "@mui/material";
import DummyTable from "../../components/table/DummyTable";
import PageHeader from "../../components/BreadCrumb";
import { useNavigate } from "react-router-dom";
import { ColumnTable } from "../../types";
import { Project } from "../../types/Project.types";
import { useProjectContext } from "../../Context/Project";



const ProjectListPage = () => {
  const  navigate = useNavigate();
  const columns: ColumnTable<Project>[] = [
    {
      name: "id",
      id: "id",
      label: "ID",
    },
    {
      name: "name",
      id: "name",
      label: "Project Name",
    },
    {
      name: "startDate",
      id: "startDate",
      label: "Start Date",
    },
    {
      name: "endDate",
      id: "endDate",
      label: "End Date",
    },
    {
      name: "projectManager",
      id: "projectManager",
      label: "Project Manager",
    },
    {
      name: "actions",
      id: "actions",
      label: "Actions",
      render: (row:Project) => (
        <Stack direction="row" spacing={1}>
          <Button
            variant="contained"
            color="primary"
            onClick={() => {
              // project/:id 
              if(!row.id) return;
              navigate(`/project/${row.id}`);
          
            }}
          >
            Edit
          </Button>
        </Stack>
      ),
    }
    
  ];

  const [loading, setLoading] = useState<boolean>(false); 
  const [error,setError]=useState("")
  const {state,dispatch}=useProjectContext()

  useEffect(() => {
    setLoading(true);
    setError(''); 
    fetch('http://localhost:3001/projects')
      .then((res) => res.json()) 
      .then((data) => {
        dispatch({type:"SET_PROJECTS",payload:data})
      })
      .catch((error: unknown) => {
        setError((error as Error).message || "Failed to load projects. Please try again later.");
      })
      .finally(() => setLoading(false)); 
  }, [dispatch]);


  return (
    <Stack direction="column" sx={{ padding: "5px 15px" }}>
      <PageHeader
        breadcrumbs={[
          {
            label: "Project List",
            href: `/`,
          },
          { label: "View" },
        ]}
      />
            {error && <div style={{ color: 'red', marginBottom: '10px' }}>{error}</div>}

      <DummyTable
        columns={columns}
        data={state?.projects || []}
        loading={loading}
      />
    </Stack>
  );
};

export default ProjectListPage;

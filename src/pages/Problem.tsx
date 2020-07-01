import React, {useEffect, useState,useContext} from 'react';
import { Row, Col, Button } from 'reactstrap';
import {RouteComponentProps, Link, Redirect} from 'react-router-dom';
import {fetchWithAuth} from '../services/fetch';
import ReactHtmlParser from 'react-html-parser';
import Loading from "../components/Loading";
import Editor from "../components/Editor";
import MainContext from "../services/MainContext";



interface ProblemInterface {
  content: string,
  created: string,
  id: number | null,
  pack: number | null,
  title: string
}


const Problem: any = (props:RouteComponentProps<any>) => {


  const Context = useContext(MainContext);
  const [code, setCode] = useState<string>('');
  const [redirect,setRedirect] = useState<boolean>(false);
  const [problem,setProblem] = useState<ProblemInterface>({
    content: '',
    created: '',
    id: null,
    pack: null,
    title: ''
  });

  const onChange = (newValue: string): void => {
    setCode(newValue);
  }

  useEffect(() => {
    fetchWithAuth(`main/problems/${props.match.params.id}`,{headers: {'Accept': 'application/json'}})
        .then(res => res.json())
        .then(json => {
          Context.setTitle('Problem ' + json.title);
          setProblem(json)
        })
        .catch(e => console.error(e))
  },[props.match.params.id])

  const handleClick = ():void => {
    const input: HTMLElement | null = document.getElementById('hidden-file-input');
    input?.click();
  }

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>):void => {
    const formData = new FormData();
    // @ts-ignore
    formData.append('datafile', event.target.files[0]);
    formData.append('problem', props.match.params.id);

    fetchWithAuth('main/files/upload/',{
      method: 'POST',
      body: formData
    }).then(res => res.json())
        .then(() => setRedirect(!redirect))
        .catch(e => console.error(e))
  }

  const sendContent = ():void => {
    const formData = new FormData();
    formData.append("problem", props.match.params.id);
    formData.append('content',code);
    fetchWithAuth('main/files/upload/',{
      method: 'POST',
      body: formData
    }).then(res => res.json())
        .then(json => setRedirect(!redirect))
        .catch(e => console.error(e))
  }

  if(redirect) return <Redirect to={'/files'} />

  return (
      <Row className="problem">
        <Col md={6}>
          <p>Description</p>
          {problem.title ? (
              <>
                <div className="w-100 bg-white p-3 shadow rounded">
                  <p className="mb-2 problem__title">{problem.title}</p>
                  <div className="text-muted">
                    {ReactHtmlParser(problem.content)}
                  </div>
                </div>
              </>
          ) : <div className={"w-100 text-center"}>
                <Loading />
              </div>
          }

        </Col>
        <Col md={6}>
          <p>Type your solution</p>
          <Editor code={code} onChange={onChange}/>
          {localStorage.getItem("cutie-py-token") ? (
              <div className="w-100 d-flex justify-content-around align-items-center mt-3">
                <Button className="rounded pl-5 pr-5" color="success" onClick={sendContent}>Submit</Button>
                or
                <Button className="rounded mr-3 pl-4 pr-4 text-light" onClick={handleClick}>
                  Choose a file
                  <input type="file" id={"hidden-file-input"} onChange={handleChange} accept={".py"} style={{display: 'none'}}/>
                </Button>
              </div>
          ) : (<div className="w-100 d-flex justify-content-around align-items-center mt-3">
            <p className={"mb-0"}>Вы не авторизованы!</p>
            <Link to={'/'}>
              <Button>
                Войти
              </Button>
            </Link>
          </div>)}
        </Col>
      </Row>
  )
}

export default Problem;

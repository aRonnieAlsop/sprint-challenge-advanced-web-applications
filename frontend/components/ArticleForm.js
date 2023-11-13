import React, { useEffect, useState } from 'react'
import PT from 'prop-types'
import axiosWithAuth from '../axios'

const initialFormValues = { title: '', text: '', topic: '' }

export default function ArticleForm(props) {
  const [values, setValues] = useState(initialFormValues)
  // ✨ where are my props? Destructure them here
  const { currentArticleId, postArticle, updateArticle, setCurrentArticleId  } = props


  useEffect(() => {
    if (currentArticleId) {
      // Find the current article by ID
      const currentArticle = props.currentArticle

      console.log('currentArticle', currentArticle)
  
      if (currentArticle) {
        setValues({
          title: currentArticle.title,
          text: currentArticle.text,
          topic: currentArticle.topic,
        })
      } else {
        console.log('currentArticle is undefined or null')
      }
    } else {
      console.log('currentArticleId is falsy')
      setValues(initialFormValues)
    }
  }, [currentArticleId, props.currentArticle])
  
  

  const onChange = evt => {
    const { id, value } = evt.target
    setValues({ ...values, [id]: value })
  }

  const onSubmit = evt => {
    evt.preventDefault()
    
    // Check if the values have changed
    if (currentArticleId) {
      // Find the current article by ID
      const currentArticle = props.currentArticle
  
      if (
        currentArticle &&
        (values.title !== currentArticle.title ||
          values.text !== currentArticle.text ||
          values.topic !== currentArticle.topic)
      ) {
        // Only update if there are changes
        updateArticle({ article_id: currentArticle.article_id, article: values })
      }
      setCurrentArticleId() // Clear the currentArticleId
    } else {
      // Create a new article if currentArticleId is not set
      postArticle(values)
    }
  
    setValues(initialFormValues) // Reset the form
  }
  

  const isDisabled = () => {
    // ✨ implement
    // Make sure the inputs have some values and a valid topic is selected
    return !(values.title.trim().length >= 1 && values.text.trim().length >= 1 && values.topic !== '');
  }
  


  return (
    // ✨ fix the JSX: make the heading display either "Edit" or "Create"
    // and replace Function.prototype with the correct function
    <form id="form" onSubmit={onSubmit}>
      <h2>{currentArticleId ? 'Edit' : 'Create'} Article</h2>
      <input
        maxLength={50}
        onChange={onChange}
        value={values.title}
        placeholder="Enter title"
        id="title"
      />
      <textarea
        maxLength={200}
        onChange={onChange}
        value={values.text}
        placeholder="Enter text"
        id="text"
      />
      <select onChange={onChange} id="topic" value={values.topic}>
        <option value="">-- Select topic --</option>
        <option value="JavaScript">JavaScript</option>
        <option value="React">React</option>
        <option value="Node">Node</option>
      </select>
      <div className="button-group">
        <button disabled={isDisabled()} id="submitArticle">Submit</button>
        <button onClick={() => setCurrentArticleId()}>Cancel edit</button>
      </div>
    </form>
  )
}

// 🔥 No touchy: LoginForm expects the following props exactly:
ArticleForm.propTypes = {
  postArticle: PT.func.isRequired,
  updateArticle: PT.func.isRequired,
  setCurrentArticleId: PT.func.isRequired,
  currentArticle: PT.shape({ // can be null or undefined, meaning "create" mode (as opposed to "update")
    article_id: PT.number.isRequired,
    title: PT.string.isRequired,
    text: PT.string.isRequired,
    topic: PT.string.isRequired,
  })
}

import { useState, useEffect } from 'react'
import { uploadDocument, getDocuments, deleteDocument } from '../api/documents'
import Spinner from '../components/Spinner'

function Documents() {
  const [documents, setDocuments] = useState([])
  const [file, setFile] = useState(null)
  const [uploading, setUploading] = useState(false)

  useEffect(() => {
    getDocuments().then((data) => setDocuments(data.documents))
  }, [])

  async function handleUpload(event) {
    event.preventDefault()
    if (!file) return
    setUploading(true)
    await uploadDocument(file)
    setFile(null)
    const updatedList = await getDocuments()
    setDocuments(updatedList.documents)
    setUploading(false)
  }

  async function handleDelete(docId) {
    await deleteDocument(docId)
    setDocuments((prev) => prev.filter((doc) => doc.id !== docId))
  }

  return (
    <div>
      <h2>Documents</h2>

      <form onSubmit={handleUpload}>
        <input
          type="file"
          accept=".pdf"
          onChange={(e) => setFile(e.target.files[0])}
        />
       <button type="submit" disabled={uploading}>
          {uploading ? 'Uploading...' : 'Upload'}
        </button>
        {uploading && <Spinner />}
      </form>

      <ul className="list">
        {documents.map((doc, index) => (
          <li key={doc.doc_id} className="list-item">
            <span>{index + 1}. {doc.filename}</span>
            <button className="danger" onClick={() => handleDelete(doc.doc_id)}>Delete</button>
          </li>
  ))}
</ul>
    </div>
  )
}

export default Documents
import React from 'react'
import styles from '../styles/Node.module.css'
import { Note as NoteModel } from '../models/note'
import { Card } from 'react-bootstrap'
import { formatDate } from '../utils/formatDate'

interface NotePrps {
  note: NoteModel
  className?: string
}

const Note = ({ note, className }: NotePrps) => {
  const { title, text, createdAt, updatedAt } = note

  let createdUpdatedText: string
  if (updatedAt > createdAt) {
    createdUpdatedText = 'Updated: ' + formatDate(updatedAt)
  } else {
    createdUpdatedText = 'Created: ' + formatDate(createdAt)
  }

  return (
    <Card className={`${styles.noteCard} ${className}`}>
      <Card.Body className={styles.cardBody}>
        <Card.Title>{title}</Card.Title>
        <Card.Text className={styles.cardText}>{text}</Card.Text>
      </Card.Body>

      <Card.Footer className="text-muted">{createdUpdatedText}</Card.Footer>
    </Card>
  )
}

export default Note

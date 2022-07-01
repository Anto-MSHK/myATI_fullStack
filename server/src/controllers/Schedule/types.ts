export type subject = {
  title: string
  type?: string
}

export type teacher = { name: string; degree?: string }

//? >-->> byGroup <<--<
export type lessonDataG =
  | {
      subject: subject
      teachers: teacher[]
      cabinet: string
    }
  | undefined
  | 'none'
export type dayG = {
  dayOfWeek: '0' | '1' | '2' | '3' | '4' | '5'
  isWeekend: boolean
  lessons: (lessonG | undefined)[]
}
export type lessonG = {
  count: string
  time: string
  data: {
    topWeek: lessonDataG
    lowerWeek?: lessonDataG | 'none'
  }
}

//? >-->> byTeacher <<--<

export type lessonDataT =
  | {
      subject: subject
      cabinet: string
    }
  | undefined

export type lessonT = {
  group: string
  count: string
  time: string
  data: {
    topWeek?: lessonDataT
    lowerWeek?: lessonDataT
  }
}
export type dayT = {
  dayOfWeek: string
  lessons: (lessonT | undefined)[]
}

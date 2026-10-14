const posts = [
  {
    id: 1,
    title: "A quiet morning routine",
    slug: "quiet-morning-routine",
    description: "Small habits that make the start of the day feel calmer.",
    content:
      "A quiet morning does not need to be complicated. Leave a little space before checking notifications, make a warm drink, and choose one thing that matters today. A few intentional minutes can make the rest of the day feel less rushed.",
    status: "published",
    created: new Date("2025-01-12T08:30:00.000Z")
  },
  {
    id: 2,
    title: "Notes from a weekend walk",
    slug: "weekend-walk-notes",
    description: "A reminder to notice the interesting details close to home.",
    content:
      "The best part of a walk is often the detail you would have missed from a car: a new shop sign, the first flowers along a path, or a conversation drifting from an open window. Taking the familiar route slowly can make it feel new again.",
    status: "published",
    created: new Date("2025-02-03T10:15:00.000Z")
  },
  {
    id: 3,
    title: "Building a reading habit",
    slug: "building-a-reading-habit",
    description: "Make room for a few pages a day without making it a chore.",
    content:
      "Keep a book where you already spend a few quiet minutes, and start with a small goal. A page or two is enough to build a rhythm. The point is not to race through a list; it is to make reading an easy part of the day.",
    status: "draft",
    created: new Date("2025-03-18T16:45:00.000Z")
  }
];

module.exports = posts;

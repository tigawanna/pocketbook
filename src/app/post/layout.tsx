export const metadata = {
    title: 'New Post',
    description: 'Whats cooking? ',
}

export default function NewPostLayout({ children, }: { children: React.ReactNode }) {

    return (
        <section>
            {children}
        </section>
    )

}

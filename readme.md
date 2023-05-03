Grades:


+1 (minimum): Task is complete, project is successfully building and all previous features are running without any bugs.

 

+1: Code splitting. Minimum requirements AND

	Code splitting is used (small modules) (0.25)

	No copy-paste (if the same part of code is needed in different files it’s wrapped as a separate module or custom hook) (0.25)

	All css files are injected with import statement (0.25)

	All assets (images, fonts, etc) are injected with import statements. Assets are located in respectful folders (i.e. assets for Header component are located in components/Header/assets). (0.25)
 

+1: Clean console. Minimum requirements AND

	There’s no warnings in terminal while building an application (0.5)

	There’s no warnings in browser console while running an application (0.5)
	 

+1: Performance. Minimum requirements AND

	For form elements uncontrolled input approach is used (0.25)

	Key prop is not an array index. Some unique field is used. Unique field doesn't change when adding\removing elements to the array. (0.25)

	Props passed by reference are wrapped in useMemo\useCallback hooks (0.25)

	If useEffect is used, it should return a respectful “canceling” function (if needed) (0.25)
 

+1: Hooks. Minimum requirements AND:

	All hooks are declared before the first return statement (0.2)

	There is no missed or extra hooks dependencies (or, if it’s reasonably needed, there is a comment explaining why) (0.2)

	There is no functions wrapped in useMemo (useCallback is used instead) (0.2)

	All useState and useRef hooks have declared default value, relevant to their purpose (0.2)

	useState is reasonably splitted (i.e. instead of `const [ state, setState ] = useState({ isLoading: false, users: [] })` the student used `const [ isLoading, setIsLoading ] = useState(false)` and `const [ users, setUsers ] = useState([])`) (0.2)

	useMemo is reasonably splitted (i.e. instead of `const data = useMemo(() => ({ users, tasks }), [ users, tasks ])` the student used `const usersObj = useMemo(() => ({ users }), [users])` and `const tasksObj = useMemo(() => ({ tasks }), [ tasks ])`) (0.2)
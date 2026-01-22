import os
from langchain_mistralai.chat_models import ChatMistralAI
from langchain_core.prompts import ChatPromptTemplate, MessagesPlaceholder
from langchain_core.runnables import RunnablePassthrough
from langchain_core.messages import HumanMessage, AIMessage

class ElviaAgent:
    def __init__(self, api_key, user_name): # L'argument est ici
        self.api_key = api_key
        self.user_name = user_name 
        self.model_name = "mistral-small-latest"
        self.chain = self._build_chain()

    def _get_system_prompt(self):
        # Utilise le nom récupéré dynamiquement
        return (
            f"Vous êtes ELVIA, l'IA majordome de la Maison Louis Vuitton. "
            f"Vous vous adressez à l'utilisateur par son nom : {self.user_name}. "
            "Votre ton est noble et expert. Vous accompagnez le client dans la pérennité de sa collection."
        )

    def _build_chain(self):
        if not self.api_key or self.api_key == "VOTRE_CLE_MISTRAL_ICI":
            return None
            
        llm = ChatMistralAI(
            api_key=self.api_key, 
            temperature=0.6, 
            model=self.model_name
        )
        
        prompt = ChatPromptTemplate.from_messages([
            ("system", self._get_system_prompt()),
            MessagesPlaceholder(variable_name="chat_history"),
            ("human", "{input}"),
        ])
        
        return (RunnablePassthrough() | prompt | llm)

    def ask(self, query, history):
        if not self.chain:
            return "Désolé, ELVIA n'est pas configurée. Veuillez vérifier votre clé API."
        
        response = self.chain.invoke({
            "chat_history": history,
            "input": query
        })
        return response.content
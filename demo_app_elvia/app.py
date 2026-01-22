import streamlit as st
import time
from elvia_agent import ElviaAgent 
from langchain_core.messages import HumanMessage, AIMessage

# =================================================================
# 1. CONFIGURATION ET STYLE (FIX VISIBILITÉ ÉCRITURE)
# =================================================================
st.set_page_config(page_title="LOUIS VUITTON & MOI", page_icon="👜", layout="wide")

st.markdown("""
    <style>
    .stApp { background-color: #F5F5DC; }
    html, body, [class*="st-"] { color: #001F3F; font-family: 'Georgia', serif; }

    /* --- FORCE LE TEXTE EN BLANC DANS TOUS LES CHAMPS DE SAISIE --- */
    input, textarea, [data-baseweb="input"] input, [data-baseweb="textarea"] textarea {
        color: #FFFFFF !important;
        -webkit-text-fill-color: #FFFFFF !important;
        caret-color: #D4AF37 !important;
    }

    /* FIX SPECIFIQUE POUR SELECTBOX ET DATE INPUT */
    [data-baseweb="select"] div, [data-testid="stSelectbox"] div {
        color: #FFFFFF !important;
        -webkit-text-fill-color: #FFFFFF !important;
    }

    /* Style spécifique pour le Chat Input */
    .stChatInput textarea {
        color: #FFFFFF !important;
        -webkit-text-fill-color: #FFFFFF !important;
    }

    /* --- BOUTONS (STANDARDS ET FORMULAIRES) : TEXTE BLANC --- */
    /* Ajout du ciblage pour st.form_submit_button */
    .stButton > button, div[data-testid="stFormSubmitButton"] > button { 
        background-color: #001F3F !important; 
        border: 1px solid #D4AF37 !important; 
        border-radius: 0px !important; 
        width: 100% !important;
        height: 60px !important; 
        text-transform: uppercase !important; 
    }

    /* Ciblage profond pour forcer le blanc sur le texte, même dans les formulaires */
    .stButton > button div, 
    .stButton > button p, 
    .stButton > button span, 
    div[data-testid="stFormSubmitButton"] button p,
    div[data-testid="stFormSubmitButton"] button span {
        color: #FFFFFF !important;
        -webkit-text-fill-color: #FFFFFF !important;
        font-weight: bold !important;
    }
    
    /* Effet au survol pour tous les boutons */
    .stButton > button:hover, div[data-testid="stFormSubmitButton"] > button:hover { 
        background-color: #D4AF37 !important; 
        border-color: #001F3F !important; 
    }
    
    .stButton > button:hover p, 
    .stButton > button:hover span,
    div[data-testid="stFormSubmitButton"] button:hover p { 
        color: #001F3F !important; 
        -webkit-text-fill-color: #001F3F !important;
    }

    /* Sidebar Design */
    [data-testid="stSidebar"] { background-color: #001F3F !important; color: white !important; border-right: 2px solid #D4AF37; }
    [data-testid="stSidebar"] [data-testid="stMarkdownContainer"] p { color: white !important; }
    
    /* Bannière Carbone */
    .carbon-total-box {
        display: flex; align-items: center; background-color: #001F3F; padding: 40px;
        color: #F5F5DC; border-left: 10px solid #D4AF37; margin-bottom: 40px;
    }
    .carbon-number { font-size: 4.5rem; font-weight: bold; margin-right: 40px; color: #D4AF37; }

    /* Cartes Produits */
    .product-card {
        background-color: white; padding: 30px; border: 1px solid #D4AF37;
        text-align: center; margin-bottom: 10px; height: 650px; 
        display: flex; flex-direction: column; justify-content: space-between;
    }
    .product-img { width: 100%; max-width: 250px; height: auto; margin: 0 auto 20px auto; }

    .elvia-bubble { 
        background-color: #001F3F; padding: 35px; border-left: 5px solid #D4AF37; 
        color: #F5F5DC !important; font-style: italic; margin: 30px 0;
    }
    </style>
    """, unsafe_allow_html=True)
# =================================================================
# 2. INITIALISATION SESSION
# =================================================================
PILLOW_IMG = "https://fr.louisvuitton.com/images/is/image/lv/1/PP_VP_L/louis-vuitton-doudoune-a-manches-longues-pillow--FOOW21E54900_PM2_Front%20view.png?wid=4096&hei=4096"
ALMA_IMG = "https://fr.louisvuitton.com/images/is/image/lv/1/PP_VP_L/louis-vuitton-sac-alma-bb--M27525_PM2_Front%20view.png"

if 'collection' not in st.session_state:
    st.session_state.collection = [
        {"id": "alma", "name": "Alma BB", "ref": "M27525", "carbon": 22.4, "img": ALMA_IMG, "entretien": "Octobre 2026", "matiere": "Cuir Épi"},
        {"id": "pillow", "name": "Doudoune Pillow", "ref": "1AAIJD", "carbon": 18.2, "img": PILLOW_IMG, "entretien": "Novembre 2026", "matiere": "Econyl®"}
    ]

if 'page' not in st.session_state: st.session_state.page = "login"
if 'chat_history' not in st.session_state: st.session_state.chat_history = []
if 'quiz_step' not in st.session_state: st.session_state.quiz_step = 0
if 'quiz_answers' not in st.session_state: st.session_state.quiz_answers = {}

# =================================================================
# 3. SIDEBAR : CHAT
# =================================================================
if st.session_state.page != "login":
    with st.sidebar:
        st.image("https://upload.wikimedia.org/wikipedia/commons/thumb/7/76/Louis_Vuitton_logo_and_wordmark.svg/1200px-Louis_Vuitton_logo_and_wordmark.svg.png", width=150)
        st.title("✨ ELVIA")
        user_mistral_key = st.text_input("Clé API Mistral AI", type="password", placeholder="Insérez votre clé...")
        st.markdown("---")
        
        for msg in st.session_state.chat_history:
            avatar = "👜" if isinstance(msg, AIMessage) else None
            with st.chat_message(msg.type, avatar=avatar): st.markdown(msg.content)

        if prompt := st.chat_input("Une question pour ELVIA ?", disabled=not user_mistral_key):
            agent = ElviaAgent(user_mistral_key, user_name=st.session_state.user_name)
            st.session_state.chat_history.append(HumanMessage(content=prompt))
            with st.chat_message("user"): st.markdown(prompt)
            with st.chat_message("assistant", avatar="👜"):
                response = agent.ask(prompt, st.session_state.chat_history)
                st.markdown(response)
                st.session_state.chat_history.append(AIMessage(content=response))

# =================================================================
# 4. LOGIQUE DES PAGES
# =================================================================

if st.session_state.page == "login":
    st.title("LOUIS VUITTON")
    st.subheader("Veuillez vous connecter")
    u = st.text_input("Adresse e-mail identifiée", placeholder="votre.nom@exemple.com")
    p = st.text_input("Mot de passe secret", type="password")
    if st.button("SE CONNECTER"):
        if p == "Bonjour123":
            st.session_state.user_name = u.split('.')[0].capitalize()
            st.session_state.page = "home"; st.rerun()
        else: st.error("Identifiants non reconnus.")

elif st.session_state.page == "home":
    st.title(f"Bienvenue, {st.session_state.user_name}")
    total_carbon = sum(item['carbon'] for item in st.session_state.collection)
    
    st.markdown(f"""
        <div class="carbon-total-box">
            <div class="carbon-number">{total_carbon:.1f} kg</div>
            <div class="carbon-text">
                L'empreinte carbone actuelle de votre collection est de {total_carbon:.1f} kg CO2e.<br>
                <b>« La pérennité est l'expression ultime du luxe : plus vous chérissez et conservez vos pièces, plus leur empreinte environnementale annuelle s'efface au profit de leur histoire. »</b>
            </div>
        </div>
    """, unsafe_allow_html=True)
    
    cols = st.columns(3)
    for idx, item in enumerate(st.session_state.collection):
        with cols[idx % 3]:
            st.markdown(f"""
                <div class="product-card">
                    <div>
                        <img src="{item['img']}" class="product-img">
                        <h3>{item['name']}</h3>
                        <p style="color:#D4AF37; font-size:1.1rem;">{item['matiere']} | REF: {item['ref']}</p>
                    </div>
                    <div>
                        <hr style="border:0.1px solid #F5F5DC;">
                        <p><b>Impact Carbone :</b> {item['carbon']} kg CO2e</p>
                        <p style="color:#001F3F;">🕒 Entretien : {item['entretien']}</p>
                    </div>
                </div>
            """, unsafe_allow_html=True)
            st.button(f"voir le passeport de {item['name']}", key=item['id'])

    if st.button("✨ ENREGISTRER UNE NOUVELLE PIÈCE"):
        st.session_state.page = "add_product"; st.rerun()

elif st.session_state.page == "add_product":
    st.title("Nouvelle Acquisition")
    st.markdown(f'<div class="elvia-bubble">"Bonjour {st.session_state.user_name}, Laissez-moi vous guider vers votre prochaine icône."</div>', unsafe_allow_html=True)
    if st.button("🌟 DÉBUTER LE DIAGNOSTIC"):
        st.session_state.quiz_step = 1; st.session_state.page = "quiz"; st.rerun()

elif st.session_state.page == "quiz":
    step = st.session_state.quiz_step
    st.title(f"Diagnostic — Étape {step}/4")
    st.progress(step / 4)
    
    if step == 1:
        choice = st.radio("Sélectionnez votre univers :", ["Maroquinerie Iconique", "Prêt-à-porter Technique"], key="q_type")
        if st.button("DÉFINIR L'UNIVERS"):
            st.session_state.quiz_answers['type'] = choice
            st.session_state.quiz_step = 2; st.rerun()
    elif step == 2:
        cat = st.session_state.quiz_answers['type']
        opts = ["Quotidien", "Voyage"] if cat == "Maroquinerie Iconique" else ["Performance Froid", "Mi-saison"]
        ans = st.radio("Usage :", opts, key="q_usage")
        if st.button("CONTINUER"):
            st.session_state.quiz_answers['usage'] = ans
            st.session_state.quiz_step = 3; st.rerun()
    elif step == 3:
        cat = st.session_state.quiz_answers['type']
        mats = ["Cuir Épi", "Toile Monogram"] if cat == "Maroquinerie Iconique" else ["Nylon Econyl®", "Duvet RDS"]
        ans = st.radio("Matière :", mats, key="q_mat")
        if st.button("AFFINER"):
            st.session_state.quiz_answers['matiere'] = ans
            st.session_state.quiz_step = 4; st.rerun()
    elif step == 4:
        ans = st.select_slider("Priorité :", options=["Esthétique", "Équilibre", "Impact Réduit"], key="q_val")
        if st.button("RÉVÉLER MON ICÔNE"):
            st.session_state.quiz_answers['valeur'] = ans
            st.session_state.page = "result"; st.rerun()

elif st.session_state.page == "result":
    st.title("Votre Recommandation")
    c1, c2 = st.columns([1, 1.3])
    is_leather = st.session_state.quiz_answers['type'] == "Maroquinerie Iconique"
    res_name = "Alma BB" if is_leather else "Doudoune Pillow"
    res_img = ALMA_IMG if is_leather else PILLOW_IMG
    
    with c1: st.image(res_img, use_container_width=True)
    with c2:
        st.header(res_name)
        # NOUVEAU BOUTON DPP
        if st.button("📖 VOIR LE PASSEPORT NUMÉRIQUE (DPP)"):
            st.info("Chargement des données de traçabilité sécurisées par la Maison Louis Vuitton...")
            st.write("Origine des matières : France | Empreinte certifiée | Ateliers d'Asnières.")
        
        st.markdown("<br>", unsafe_allow_html=True)
        
        # BOUTON ACQUISITION -> VERS FORMULAIRE BLOCKCHAIN
        if st.button("💎 CONFIRMER L'ACQUISITION"):
            st.session_state.page = "blockchain_form"; st.rerun()

# --- NOUVELLE PAGE : FORMULAIRE BLOCKCHAIN AURA ---
elif st.session_state.page == "blockchain_form":
    st.title("Enregistrement Blockchain Aura")
    st.markdown('<div class="elvia-bubble">"Pour garantir l\'authenticité et la pérennité de votre pièce, nous générons votre certificat infalsifiable."</div>', unsafe_allow_html=True)
    
    with st.form("aura_form"):
        st.write("Informations de propriété")
        nom = st.text_input("Nom complet du titulaire", placeholder="Yannick V.")
        date = st.date_input("Date de l'acquisition")
        boutique = st.selectbox("Boutique d'origine", ["Champs-Élysées", "Place Vendôme", "E-Store Privé"])
        
        submitted = st.form_submit_button("SÉCURISER SUR LA BLOCKCHAIN")
        if submitted:
            with st.spinner("Cryptage des données sur le consortium Aura..."):
                time.sleep(2)
                # Ajout effectif à la collection
                is_leather = st.session_state.quiz_answers['type'] == "Maroquinerie Iconique"
                new_item = {
                    "id": f"new_{len(st.session_state.collection)}",
                    "name": "Alma BB" if is_leather else "Doudoune Pillow", 
                    "ref": "M27525" if is_leather else "1AAIJD", 
                    "carbon": 22.4 if is_leather else 18.2, 
                    "img": ALMA_IMG if is_leather else PILLOW_IMG, 
                    "entretien": "Janvier 2028", 
                    "matiere": st.session_state.quiz_answers['matiere']
                }
                st.session_state.collection.append(new_item)
                st.success("Certificat Blockchain généré avec succès !")
                time.sleep(1)
                st.session_state.page = "home"; st.rerun()

st.caption("ELVIA v2.1 | Groupe 8")